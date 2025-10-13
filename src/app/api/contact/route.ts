import { NextRequest, NextResponse } from 'next/server';
import { submitContactForm, getClientIP } from '@/utils/supabaseUtils';
import { 
  sendNotificationEmail, 
  sendCustomerReplyEmail, 
  validateContactData,
  type ContactFormData 
} from '@/utils/emailService';
import { rateLimit } from '@/utils/rateLimit';

// Rate limiting: 5 requests per 15 minutes per IP
const limiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per interval
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const ip = getClientIP(request.headers);
    const { success, limit, remaining, reset } = await limiter.check(ip, 5);
    
    if (!success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.round((reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          }
        }
      );
    }

    const body = await request.json();
    
    // Extract and prepare contact form data
    const contactData: ContactFormData = {
      name: body.name?.trim() || '',
      email: body.email?.trim()?.toLowerCase() || undefined,
      phone: body.phone?.trim() || '',
      company: body.company?.trim() || undefined,
      subject: body.subject?.trim() || 'Solar Inquiry from Website',
      message: body.message?.trim() || '',
      form_type: body.form_type?.trim() || 'contact',
      user_type: body.user_type?.trim() || 'residential',
      location: body.location?.trim() || undefined,
      system_type: body.system_type?.trim() || undefined,
      monthly_bill: body.monthly_bill?.trim() || undefined,
      business_type: body.business_type?.trim() || undefined,
      power_consumption: body.power_consumption?.trim() || undefined,
      industrial_scale: body.industrial_scale?.trim() || undefined,
      source: body.source?.trim() || 'contact_page',
      metadata: {
        ...body.metadata,
        timestamp: new Date().toISOString(),
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
        ip_address: ip,
        user_agent: request.headers.get('user-agent') || 'unknown',
        referer: request.headers.get('referer') || 'direct',
      }
    };

    // Validate input data using the enhanced validation
    const validation = validateContactData(contactData as unknown as Record<string, unknown>);
    if (!validation.valid) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    // Additional business validation
    if (contactData.subject.length < 5) {
      return NextResponse.json(
        { error: 'Subject must be at least 5 characters long' },
        { status: 400 }
      );
    }

    // STEP 1: Always save to database first (critical - don't let email issues block this)
    let submissionResult;
    try {
      submissionResult = await submitContactForm(contactData);
      
      console.log(`✅ Contact form saved to database: ${submissionResult.id} from ${ip}`);
      
    } catch (dbError) {
      console.error('❌ Database submission failed:', dbError);
      return NextResponse.json(
        { error: 'Failed to save your inquiry. Please try again or contact us directly.' },
        { status: 500 }
      );
    }

    // STEP 2: Send notification email to team (non-blocking - don't fail if this fails)
    let emailResult: { success: boolean; error?: string; provider?: string; messageId?: string } = { 
      success: false, 
      error: 'Not attempted', 
      provider: 'none' 
    };
    try {
      console.log('📧 Sending team notification email...');
      emailResult = await sendNotificationEmail('contact', contactData);
      
      if (emailResult.success) {
        console.log(`✅ Team notification email sent via ${emailResult.provider || 'unknown'}: ${emailResult.messageId || 'no-id'}`);
      } else {
        console.warn('⚠️ Team notification email failed:', emailResult.error);
      }
    } catch (emailError) {
      console.error('❌ Team email error:', emailError);
      emailResult.error = emailError instanceof Error ? emailError.message : 'Unknown email error';
    }

    // STEP 3: Send customer reply email if email provided (non-blocking)
    let customerEmailResult: { success: boolean; error?: string; provider?: string; messageId?: string } = { 
      success: false, 
      error: 'No email provided', 
      provider: 'none' 
    };
    if (contactData.email) {
      try {
        console.log(`📧 Sending customer reply to: ${contactData.email}`);
        customerEmailResult = await sendCustomerReplyEmail(contactData.email, contactData);
        
        if (customerEmailResult.success) {
          console.log(`✅ Customer reply email sent via ${customerEmailResult.provider || 'unknown'}: ${customerEmailResult.messageId || 'no-id'}`);
        } else {
          console.warn('⚠️ Customer reply email failed:', customerEmailResult.error);
        }
      } catch (customerEmailError) {
        console.error('❌ Customer email error:', customerEmailError);
        customerEmailResult.error = customerEmailError instanceof Error ? customerEmailError.message : 'Unknown email error';
      }
    }

    // STEP 4: Return success response with detailed status
    const responseMessage = contactData.email 
      ? 'Thank you! Your solar inquiry has been submitted. Check your email for confirmation details.'
      : 'Thank you! Your solar inquiry has been submitted. We will contact you within 24 hours.';

    return NextResponse.json({
      success: true,
      message: responseMessage,
      submission_id: submissionResult.id,
      timestamp: submissionResult.created_at,
      details: {
        form_saved: true,
        team_notified: emailResult.success,
        customer_email_sent: customerEmailResult.success,
        email_provider: emailResult.success ? emailResult.provider : 'failed',
        next_steps: contactData.email 
          ? 'Check your email for next steps and our team will contact you within 24 hours.'
          : 'Our solar experts will contact you within 24 hours to discuss your requirements.'
      }
    }, {
      status: 201,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': (remaining - 1).toString(),
        'X-RateLimit-Reset': reset.toString(),
      }
    });

  } catch (error) {
    // Enhanced error logging
    console.error('❌ Contact form API error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      ip: getClientIP(request.headers),
    });
    
    // Handle specific error cases
    if (error instanceof Error) {
      if (error.message.includes('duplicate')) {
        return NextResponse.json(
          { error: 'A similar inquiry was recently submitted. Please wait before submitting again or contact us directly.' },
          { status: 409 }
        );
      }
      
      if (error.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'Request timed out. Please try again or contact us directly at +91 8818880540.' },
          { status: 408 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again or contact us directly.',
        fallback: {
          phone: '+91 8818880540',
          email: 'sales@autosyssunergy.com',
          message: 'You can reach us directly for immediate assistance.'
        }
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours
    }
  });
}
