import { NextRequest, NextResponse } from 'next/server';
import { submitProductInquiry, getClientIP } from '@/utils/supabaseUtils';
import { rateLimit } from '@/utils/rateLimit';

// Rate limiting: 3 requests per 10 minutes per IP for product inquiries
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
      product_name,
      message,
      company,
      product_category,
      quantity_required,
      budget_range,
      timeline,
      application_type,
      specifications,
      location
    } = body;

    if (!name || !phone || !product_name || !message) {
      return NextResponse.json(
        { error: 'Name, phone, product name and message are required' },
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
    
    if (product_name.length < 3) {
      return NextResponse.json(
        { error: 'Product name must be at least 3 characters long' },
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
      product_name: product_name.trim(),
      product_category: product_category?.trim(),
      quantity_required: quantity_required ? parseInt(quantity_required) : undefined,
      budget_range: budget_range?.trim(),
      timeline: timeline?.trim(),
      application_type: application_type?.trim(),
      message: message.trim(),
      specifications: specifications?.trim(),
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
    const submission = await submitProductInquiry(sanitizedData);
    
    // Log successful submission
    console.log(`Product inquiry submitted successfully: ${submission.id} from ${ip}`);
    
    return NextResponse.json(
      { 
        message: 'Product inquiry submitted successfully. Our product team will contact you within 24 hours.',
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
    console.error('Product inquiry submission error:', {
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
