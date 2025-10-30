import nodemailer from 'nodemailer';

// Zoho Mail SMTP transporter
const createZohoTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.ZOHO_EMAIL || 'sales@autosyssunergy.com',
      pass: process.env.ZOHO_APP_PASSWORD, // Zoho app password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Email recipients configuration
const EMAIL_RECIPIENTS = {
  sales: 'sales@autosyssunergy.com',
  support: ['sales@autosyssunergy.com', 'nitinrajput1903@gmail.com'],
  admin: ['sales@autosyssunergy.com', 'nitinrajput1903@gmail.com'],
};

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface ContactFormData {
  name: string;
  email?: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  form_type: string;
  user_type?: string;
  location?: string;
  system_type?: string;
  monthly_bill?: string;
  business_type?: string;
  power_consumption?: string;
  industrial_scale?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

export interface ProductInquiryData {
  name: string;
  email?: string;
  phone: string;
  company?: string;
  product_name: string;
  product_category?: string;
  quantity_required?: number;
  budget_range?: string;
  timeline?: string;
  message: string;
  location?: string;
  specifications?: string;
  metadata?: Record<string, unknown>;
}

export interface ServiceInquiryData {
  name: string;
  email?: string;
  phone: string;
  company?: string;
  service_name: string;
  service_category?: string;
  service_type?: string;
  project_timeline?: string;
  budget_range?: string;
  property_type?: string;
  property_size?: string;
  current_monthly_bill?: string;
  message: string;
  location?: string;
  special_requirements?: string;
  metadata?: Record<string, unknown>;
}

// Validation functions
export const validateContactData = (data: Record<string, unknown>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || (typeof data.name === 'string' && data.name.trim().length < 2)) {
    errors.push('Name is required and must be at least 2 characters');
  }

  if (!data.phone || (typeof data.phone === 'string' && !/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(data.phone.replace(/\s/g, '')))) {
    errors.push('Valid phone number is required');
  }

  if (data.email && typeof data.email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required if provided');
  }

  if (!data.message || (typeof data.message === 'string' && data.message.trim().length < 10)) {
    errors.push('Message is required and must be at least 10 characters');
  }

  return { valid: errors.length === 0, errors };
};

// Email template generators
export const generateContactFormTemplate = (data: ContactFormData): EmailTemplate => {
  const formTypeDisplay = {
    'general': 'General Contact',
    'homepage': 'Homepage Contact',
    'contact': 'Contact Page',
    'product_inquiry': 'Product Inquiry',
    'service_inquiry': 'Service Inquiry'
  };

  const userTypeDisplay = {
    'residential': 'Residential Customer',
    'commercial': 'Commercial Client',
    'industrial': 'Industrial Client'
  };

  const subject = `🔔 New ${formTypeDisplay[data.form_type as keyof typeof formTypeDisplay] || 'Contact'} Form Submission - ${data.name}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
            @media screen and (max-width: 600px) {
                .container { width: 100% !important; padding: 10px !important; }
                .content { padding: 15px !important; }
                .header { padding: 15px !important; }
                .footer { padding: 10px !important; }
            }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                margin: 0; 
                padding: 0; 
                background-color: #f5f5f5; 
            }
            .container { 
                max-width: 600px; 
                margin: 20px auto; 
                background: white; 
                border-radius: 12px; 
                overflow: hidden; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
            }
            .header { 
                background: linear-gradient(135deg, #2563EB, #1D4ED8); 
                color: white; 
                padding: 25px; 
                text-align: center; 
            }
            .header h1 { 
                margin: 0; 
                font-size: 24px; 
                font-weight: 600; 
            }
            .header p { 
                margin: 8px 0 0 0; 
                opacity: 0.9; 
                font-size: 16px; 
            }
            .content { 
                padding: 25px; 
                background: #ffffff; 
            }
            .section { 
                margin-bottom: 25px; 
            }
            .section h2 { 
                font-size: 18px; 
                color: #1F2937; 
                margin: 0 0 15px 0; 
                padding-bottom: 8px; 
                border-bottom: 2px solid #E5E7EB; 
            }
            .info-row { 
                display: flex; 
                margin: 12px 0; 
                padding: 12px; 
                background: #F9FAFB; 
                border-radius: 8px; 
                border-left: 4px solid #3B82F6; 
            }
            .label { 
                font-weight: 600; 
                color: #374151; 
                min-width: 140px; 
                flex-shrink: 0; 
            }
            .value { 
                color: #111827; 
                flex: 1; 
            }
            .message-box { 
                background: #F0F9FF; 
                border: 1px solid #BAE6FD; 
                border-radius: 8px; 
                padding: 15px; 
                white-space: pre-wrap; 
                font-size: 14px; 
                line-height: 1.5; 
            }
            .footer { 
                background: #1F2937; 
                color: white; 
                padding: 20px; 
                text-align: center; 
            }
            .footer p { 
                margin: 5px 0; 
                font-size: 14px; 
            }
            .urgent-banner { 
                background: #FEF2F2; 
                border-left: 4px solid #EF4444; 
                padding: 12px; 
                margin-bottom: 20px; 
                border-radius: 4px; 
            }
            .urgent-banner strong { 
                color: #DC2626; 
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>⚡ New Contact Form Submission</h1>
                <p><strong>Autosys Sunergy</strong> - Premier Solar Solutions</p>
            </div>
            
            <div class="content">
                <div class="urgent-banner">
                    <strong>⏰ Action Required:</strong> New customer inquiry received. Please respond within 24 hours for optimal conversion.
                </div>

                <div class="section">
                    <h2>👤 Contact Information</h2>
                    <div class="info-row">
                        <span class="label">Name:</span> 
                        <span class="value"><strong>${data.name}</strong></span>
                    </div>
                    <div class="info-row">
                        <span class="label">Phone:</span> 
                        <span class="value"><a href="tel:${data.phone}" style="color: #2563EB; text-decoration: none;">${data.phone}</a></span>
                    </div>
                    ${data.email ? `<div class="info-row"><span class="label">Email:</span> <span class="value"><a href="mailto:${data.email}" style="color: #2563EB; text-decoration: none;">${data.email}</a></span></div>` : ''}
                    ${data.company ? `<div class="info-row"><span class="label">Company:</span> <span class="value">${data.company}</span></div>` : ''}
                    ${data.location ? `<div class="info-row"><span class="label">Location:</span> <span class="value">${data.location}</span></div>` : ''}
                </div>

                <div class="section">
                    <h2>📋 Inquiry Details</h2>
                    <div class="info-row">
                        <span class="label">Form Type:</span> 
                        <span class="value">${formTypeDisplay[data.form_type as keyof typeof formTypeDisplay] || data.form_type}</span>
                    </div>
                    ${data.user_type ? `<div class="info-row"><span class="label">Customer Type:</span> <span class="value">${userTypeDisplay[data.user_type as keyof typeof userTypeDisplay] || data.user_type}</span></div>` : ''}
                    <div class="info-row">
                        <span class="label">Subject:</span> 
                        <span class="value"><strong>${data.subject}</strong></span>
                    </div>
                    
                    ${data.system_type ? `<div class="info-row"><span class="label">System Type:</span> <span class="value">${data.system_type}</span></div>` : ''}
                    ${data.monthly_bill ? `<div class="info-row"><span class="label">Monthly Bill:</span> <span class="value">${data.monthly_bill}</span></div>` : ''}
                    ${data.business_type ? `<div class="info-row"><span class="label">Business Type:</span> <span class="value">${data.business_type}</span></div>` : ''}
                    ${data.power_consumption ? `<div class="info-row"><span class="label">Power Consumption:</span> <span class="value">${data.power_consumption}</span></div>` : ''}
                    ${data.industrial_scale ? `<div class="info-row"><span class="label">Industrial Scale:</span> <span class="value">${data.industrial_scale}</span></div>` : ''}
                </div>

                <div class="section">
                    <h2>💬 Customer Message</h2>
                    <div class="message-box">${data.message}</div>
                </div>

                <div class="section">
                    <h2>📊 Source Information</h2>
                    <div class="info-row">
                        <span class="label">Source:</span> 
                        <span class="value">${data.source || 'Website Direct'}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Submitted:</span> 
                        <span class="value">${new Date().toLocaleString('en-IN', { 
                          timeZone: 'Asia/Kolkata',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                    </div>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>🚀 Next Steps:</strong> Contact customer within 24 hours | Prepare customized solar proposal</p>
                <p><strong>Autosys Sunergy Solar Solutions</strong></p>
                <p>📍 A-1/C, Pologround Road, Indore, Madhya Pradesh</p>
                <p>📞 +91 8818880540 | 📧 sales@autosyssunergy.com</p>
                <p style="margin-top: 10px; font-size: 12px; opacity: 0.8;">This is an automated notification from your website contact form.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const text = `
NEW CONTACT FORM SUBMISSION - AUTOSYS SUNERGY

⚡ URGENT: Customer inquiry received - Please respond within 24 hours

CONTACT INFORMATION:
👤 Name: ${data.name}
📞 Phone: ${data.phone}
${data.email ? `📧 Email: ${data.email}` : ''}
${data.company ? `🏢 Company: ${data.company}` : ''}
${data.location ? `📍 Location: ${data.location}` : ''}

INQUIRY DETAILS:
📋 Form Type: ${formTypeDisplay[data.form_type as keyof typeof formTypeDisplay] || data.form_type}
${data.user_type ? `👥 Customer Type: ${userTypeDisplay[data.user_type as keyof typeof userTypeDisplay] || data.user_type}` : ''}
📝 Subject: ${data.subject}

SYSTEM REQUIREMENTS:
${data.system_type ? `⚡ System Type: ${data.system_type}` : ''}
${data.monthly_bill ? `💰 Monthly Bill: ${data.monthly_bill}` : ''}
${data.business_type ? `🏢 Business Type: ${data.business_type}` : ''}
${data.power_consumption ? `⚡ Power Consumption: ${data.power_consumption}` : ''}
${data.industrial_scale ? `🏭 Industrial Scale: ${data.industrial_scale}` : ''}

CUSTOMER MESSAGE:
${data.message}

SOURCE INFORMATION:
📊 Source: ${data.source || 'Website Direct'}
⏰ Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

NEXT STEPS:
🚀 Contact customer within 24 hours
📋 Prepare customized solar proposal
💰 Provide detailed quotation

Autosys Sunergy Solar Solutions
A-1/C, Pologround Road, Indore, MP
Phone: +91 8818880540 | Email: sales@autosyssunergy.com
  `;

  return { subject, html, text };
};

// Customer reply email template
export const generateCustomerReplyTemplate = (data: ContactFormData): EmailTemplate => {
  const subject = `Thank you for your inquiry - Autosys Sunergy Solar Solutions`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - Autosys Sunergy</title>
        <style>
            @media screen and (max-width: 600px) {
                .container { width: 100% !important; padding: 10px !important; }
                .content { padding: 15px !important; }
                .header { padding: 15px !important; }
            }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                margin: 0; 
                padding: 0; 
                background-color: #f5f5f5; 
            }
            .container { 
                max-width: 600px; 
                margin: 20px auto; 
                background: white; 
                border-radius: 12px; 
                overflow: hidden; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
            }
            .header { 
                background: linear-gradient(135deg, #059669, #10B981); 
                color: white; 
                padding: 25px; 
                text-align: center; 
            }
            .header h1 { 
                margin: 0; 
                font-size: 24px; 
                font-weight: 600; 
            }
            .content { 
                padding: 25px; 
            }
            .welcome-message { 
                background: #F0FDF4; 
                border-left: 4px solid #10B981; 
                padding: 15px; 
                border-radius: 8px; 
                margin-bottom: 20px; 
            }
            .next-steps { 
                background: #FEF3C7; 
                border: 1px solid #F59E0B; 
                border-radius: 8px; 
                padding: 15px; 
                margin: 20px 0; 
            }
            .contact-info { 
                background: #F3F4F6; 
                border-radius: 8px; 
                padding: 15px; 
                margin: 20px 0; 
            }
            .benefits { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
                gap: 15px; 
                margin: 20px 0; 
            }
            .benefit-item { 
                background: #EFF6FF; 
                border-left: 4px solid #3B82F6; 
                padding: 12px; 
                border-radius: 6px; 
            }
            .footer { 
                background: #1F2937; 
                color: white; 
                padding: 20px; 
                text-align: center; 
            }
            .cta-button { 
                display: inline-block; 
                background: #059669; 
                color: white; 
                padding: 12px 24px; 
                text-decoration: none; 
                border-radius: 6px; 
                font-weight: 600; 
                margin: 10px 5px; 
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🙏 Thank You, ${data.name}!</h1>
                <p>Your solar journey starts here with <strong>Autosys Sunergy</strong></p>
            </div>
            
            <div class="content">
                <div class="welcome-message">
                    <h2 style="margin-top: 0; color: #059669;">✅ We've Received Your Inquiry!</h2>
                    <p>Thank you for choosing Autosys Sunergy for your solar energy needs. We're excited to help you transition to clean, renewable energy and reduce your electricity bills significantly.</p>
                </div>

                <div class="next-steps">
                    <h3 style="margin-top: 0; color: #F59E0B;">⏰ What Happens Next?</h3>
                    <ul style="margin: 0;">
                        <li><strong>Within 24 hours:</strong> Our solar expert will contact you</li>
                        <li><strong>Free Consultation:</strong> Discuss your energy needs and goals</li>
                        <li><strong>Site Assessment:</strong> Professional evaluation of your property</li>
                        <li><strong>Custom Proposal:</strong> Tailored solar solution with ROI analysis</li>
                        <li><strong>Installation:</strong> Professional setup by certified technicians</li>
                    </ul>
                </div>

                <div class="contact-info">
                    <h3 style="margin-top: 0;">📞 Need Immediate Assistance?</h3>
                    <p><strong>Call us directly:</strong> <a href="tel:+918818880540" style="color: #059669;">+91 8818880540</a></p>
                    <p><strong>Email:</strong> <a href="mailto:sales@autosyssunergy.com" style="color: #059669;">sales@autosyssunergy.com</a></p>
                    <p><strong>Address:</strong> A-1/C, Pologround Road, Indore, Madhya Pradesh</p>
                </div>

                <div class="benefits">
                    <div class="benefit-item">
                        <h4 style="margin: 0 0 5px 0; color: #1E40AF;">🏆 18+ Years Experience</h4>
                        <p style="margin: 0; font-size: 14px;">Trusted solar solutions provider</p>
                    </div>
                    <div class="benefit-item">
                        <h4 style="margin: 0 0 5px 0; color: #1E40AF;">⚡ Premium Components</h4>
                        <p style="margin: 0; font-size: 14px;">High-efficiency solar panels & inverters</p>
                    </div>
                    <div class="benefit-item">
                        <h4 style="margin: 0 0 5px 0; color: #1E40AF;">🛡️ 25-Year Warranty</h4>
                        <p style="margin: 0; font-size: 14px;">Comprehensive product & performance warranty</p>
                    </div>
                    <div class="benefit-item">
                        <h4 style="margin: 0 0 5px 0; color: #1E40AF;">💰 Maximum Savings</h4>
                        <p style="margin: 0; font-size: 14px;">Up to 90% reduction in electricity bills</p>
                    </div>
                </div>

                <div style="text-align: center; margin: 25px 0;">
                    <a href="tel:+918818880540" class="cta-button">📞 Call Now</a>
                    <a href="https://www.autosyssunergy.com" class="cta-button">🌐 Visit Website</a>
                </div>

                <p style="text-align: center; color: #6B7280; font-size: 14px; margin-top: 20px;">
                    Follow us for solar tips and updates:<br>
                    <a href="#" style="color: #3B82F6; margin: 0 10px;">Facebook</a> |
                    <a href="#" style="color: #3B82F6; margin: 0 10px;">Instagram</a> |
                    <a href="#" style="color: #3B82F6; margin: 0 10px;">LinkedIn</a>
                </p>
            </div>
            
            <div class="footer">
                <p><strong>Autosys Sunergy - Leading Solar Solutions Provider</strong></p>
                <p>Making solar energy accessible and affordable for everyone</p>
                <p style="font-size: 12px; opacity: 0.8; margin-top: 10px;">
                    This email was sent because you submitted a contact form on our website.<br>
                    If you have any questions, please reply to this email or call us directly.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;

  const text = `
Thank You for Your Solar Inquiry - Autosys Sunergy

Dear ${data.name},

Thank you for choosing Autosys Sunergy for your solar energy needs! We're excited to help you transition to clean, renewable energy.

✅ YOUR INQUIRY HAS BEEN RECEIVED

We've successfully received your inquiry and our team is already working on preparing the best solar solution for you.

⏰ WHAT HAPPENS NEXT?

1. Within 24 hours: Our solar expert will contact you
2. Free Consultation: Discuss your energy needs and goals
3. Site Assessment: Professional evaluation of your property
4. Custom Proposal: Tailored solar solution with ROI analysis
5. Installation: Professional setup by certified technicians

📞 NEED IMMEDIATE ASSISTANCE?

Call us directly: +91 8818880540
Email: sales@autosyssunergy.com
Address: A-1/C, Pologround Road, Indore, Madhya Pradesh

🏆 WHY CHOOSE AUTOSYS SUNERGY?

✓ 18+ Years Experience - Trusted solar solutions provider
✓ Premium Components - High-efficiency solar panels & inverters
✓ 25-Year Warranty - Comprehensive product & performance warranty
✓ Maximum Savings - Up to 90% reduction in electricity bills
✓ Professional Installation - Certified technicians & quality assurance
✓ Ongoing Support - 24/7 customer service & maintenance

💰 START SAVING TODAY!

Solar energy is not just good for the environment - it's great for your wallet too! 
Join thousands of satisfied customers who are already saving on their electricity bills.

Best regards,
Autosys Sunergy Solar Solutions Team

📞 +91 8818880540 | 📧 sales@autosyssunergy.com
🌐 www.autosyssunergy.com
📍 A-1/C, Pologround Road, Indore, MP

Follow us for solar tips and updates on social media!
  `;

  return { subject, html, text };
};

// Send email using Zoho Mail SMTP
export const sendEmailWithZoho = async (
  to: string[],
  template: EmailTemplate,
  from: string = 'sales@autosyssunergy.com',
  replyTo?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  try {
    const transporter = createZohoTransporter();

    const mailOptions = {
      from: `"Autosys Sunergy Solar Solutions" <${from}>`,
      to: to.join(', '),
      replyTo: replyTo || from,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', {
      messageId: info.messageId,
      to: to,
      subject: template.subject
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Zoho email send error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown email error' 
    };
  }
};

// Main email sending function
export const sendNotificationEmail = async (
  emailType: 'contact' | 'product' | 'service',
  data: ContactFormData | ProductInquiryData | ServiceInquiryData,
  recipients: string[] = EMAIL_RECIPIENTS.support
): Promise<{ success: boolean; provider?: string; messageId?: string; error?: string }> => {
  let template: EmailTemplate;

  // Generate appropriate template
  switch (emailType) {
    case 'contact':
      template = generateContactFormTemplate(data as ContactFormData);
      break;
    case 'product':
      template = generateContactFormTemplate(data as ContactFormData); // Using contact template for now
      break;
    case 'service':
      template = generateContactFormTemplate(data as ContactFormData); // Using contact template for now
      break;
    default:
      return { success: false, error: 'Invalid email type' };
  }

  // Send notification email to team
  const result = await sendEmailWithZoho(recipients, template);
  
  if (result.success) {
    return { ...result, provider: 'zoho' };
  }

  console.error('Email sending failed:', result.error);
  return { success: false, error: result.error || 'Email sending failed' };
};

// Send customer reply email
export const sendCustomerReplyEmail = async (
  customerEmail: string,
  data: ContactFormData
): Promise<{ success: boolean; provider?: string; messageId?: string; error?: string }> => {
  if (!customerEmail) {
    return { success: false, error: 'Customer email not provided' };
  }

  const template = generateCustomerReplyTemplate(data);
  const result = await sendEmailWithZoho([customerEmail], template);
  
  if (result.success) {
    return { ...result, provider: 'zoho' };
  }

  console.error('Customer reply email failed:', result.error);
  return { success: false, error: result.error || 'Customer reply email failed' };
};

export default {
  sendNotificationEmail,
  sendCustomerReplyEmail,
  generateContactFormTemplate,
  generateCustomerReplyTemplate,
  validateContactData,
  EMAIL_RECIPIENTS,
};
