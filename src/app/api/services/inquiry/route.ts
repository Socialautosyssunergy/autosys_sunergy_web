import { NextRequest, NextResponse } from 'next/server';
import { submitServiceInquiry, getClientIP } from '@/utils/supabaseUtils';
import { rateLimit } from '@/utils/rateLimit';

// Rate limiting: 3 requests per 10 minutes per IP for service inquiries
const limiter = rateLimit({
  interval: 10 * 60 * 1000, // 10 minutes
  uniqueTokenPerInterval: 500,
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const ip = getClientIP(request.headers);
    const { success, limit, remaining, reset } = await limiter.check(ip, 3);
    
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
    
    // Extract and validate required fields
    const { 
      name, 
      email, 
      phone, 
      service_name,
      message,
      company,
      service_category,
      service_type,
      project_timeline,
      budget_range,
      property_type,
      property_size,
      roof_type,
      current_monthly_bill,
      preferred_system_size,
      special_requirements,
      location
    } = body;

    if (!name || !phone || !service_name || !message) {
      return NextResponse.json(
        { error: 'Name, phone, service name and message are required' },
        { status: 400 }
      );
    }
    
    // Enhanced validation
    if (name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }
    
    if (service_name.length < 3) {
      return NextResponse.json(
        { error: 'Service name must be at least 3 characters long' },
        { status: 400 }
      );
    }
    
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }
    
    // Validate email format only if provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate phone format
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }
    
    // Sanitize and prepare data
    const sanitizedData = {
      name: name.trim(),
      email: email ? email.trim().toLowerCase() : undefined,
      phone: phone.trim(),
      company: company?.trim(),
      service_name: service_name.trim(),
      service_category: service_category?.trim(),
      service_type: service_type?.trim(),
      project_timeline: project_timeline?.trim(),
      budget_range: budget_range?.trim(),
      property_type: property_type?.trim(),
      property_size: property_size?.trim(),
      roof_type: roof_type?.trim(),
      current_monthly_bill: current_monthly_bill?.trim(),
      preferred_system_size: preferred_system_size?.trim(),
      message: message.trim(),
      special_requirements: special_requirements?.trim(),
      location: location?.trim(),
      metadata: {
        ...body.metadata,
        timestamp: new Date().toISOString(),
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
      },
      ip_address: ip,
      user_agent: request.headers.get('user-agent') || undefined,
      referer: request.headers.get('referer') || undefined,
    };
    
    // Submit to Supabase with email notification
    const submission = await submitServiceInquiry(sanitizedData);
    
    // Log successful submission
    console.log(`Service inquiry submitted successfully: ${submission.id} from ${ip}`);
    
    return NextResponse.json(
      { 
        message: 'Service inquiry submitted successfully. Our service team will contact you within 24 hours to schedule a consultation.',
        id: submission.id,
        timestamp: submission.created_at
      },
      { 
        status: 201,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': (remaining - 1).toString(),
          'X-RateLimit-Reset': reset.toString(),
        }
      }
    );
    
  } catch (error) {
    // Enhanced error logging
    console.error('Service inquiry submission error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      ip: getClientIP(request.headers),
    });
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later or contact us directly.' },
      { status: 500 }
    );
  }
}
