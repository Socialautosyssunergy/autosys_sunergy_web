import { Resend } from 'resend';
import type { ContactFormData } from './emailService';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuration
const RESEND_CONFIG = {
  fromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
  fromName: 'Autosys Sunergy',
  toEmail: 'Social@autosyssunergy.com',
  replyToEmail: 'sales@autosyssunergy.com',
};

/**
 * Generate HTML email template for team notification
 */
export const generateResendTeamNotificationTemplate = (data: ContactFormData): { subject: string; html: string; text: string } => {
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

  const subject = `🔔 New ${formTypeDisplay[data.form_type as keyof typeof formTypeDisplay] || 'Contact'} Form - ${data.name}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); padding: 30px; text-align: center;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff;">⚡ New Contact Form Submission</h1>
                                <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;"><strong>Autosys Sunergy</strong> - Premier Solar Solutions</p>
                            </td>
                        </tr>

                        <!-- Urgent Banner -->
                        <tr>
                            <td style="padding: 20px 30px 0 30px;">
                                <div style="background-color: #FEF2F2; border-left: 4px solid #EF4444; padding: 12px; border-radius: 4px;">
                                    <strong style="color: #DC2626;">⏰ Action Required:</strong> New customer inquiry received. Please respond within 24 hours for optimal conversion.
                                </div>
                            </td>
                        </tr>

                        <!-- Contact Information Section -->
                        <tr>
                            <td style="padding: 20px 30px;">
                                <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #1F2937; padding-bottom: 8px; border-bottom: 2px solid #E5E7EB;">👤 Contact Information</h2>
                                
                                <table width="100%" cellpadding="8" cellspacing="0">
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Name:</td>
                                                    <td style="color: #111827;"><strong>${data.name}</strong></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Phone:</td>
                                                    <td style="color: #111827;"><a href="tel:${data.phone}" style="color: #2563EB; text-decoration: none;">${data.phone}</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ${data.email ? `
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Email:</td>
                                                    <td style="color: #111827;"><a href="mailto:${data.email}" style="color: #2563EB; text-decoration: none;">${data.email}</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}
                                    ${data.company ? `
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Company:</td>
                                                    <td style="color: #111827;">${data.company}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}
                                    ${data.location ? `
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Location:</td>
                                                    <td style="color: #111827;">${data.location}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}
                                </table>
                            </td>
                        </tr>

                        <!-- Inquiry Details Section -->
                        <tr>
                            <td style="padding: 20px 30px;">
                                <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #1F2937; padding-bottom: 8px; border-bottom: 2px solid #E5E7EB;">📋 Inquiry Details</h2>
                                
                                <table width="100%" cellpadding="8" cellspacing="0">
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Form Type:</td>
                                                    <td style="color: #111827;">${formTypeDisplay[data.form_type as keyof typeof formTypeDisplay] || data.form_type}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ${data.user_type ? `
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Customer Type:</td>
                                                    <td style="color: #111827;">${userTypeDisplay[data.user_type as keyof typeof userTypeDisplay] || data.user_type}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Subject:</td>
                                                    <td style="color: #111827;"><strong>${data.subject}</strong></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ${data.system_type ? `
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">System Type:</td>
                                                    <td style="color: #111827;">${data.system_type}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}
                                    ${data.monthly_bill ? `
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Monthly Bill:</td>
                                                    <td style="color: #111827;">${data.monthly_bill}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}
                                    ${data.business_type ? `
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Business Type:</td>
                                                    <td style="color: #111827;">${data.business_type}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}
                                    ${data.power_consumption ? `
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Power Consumption:</td>
                                                    <td style="color: #111827;">${data.power_consumption}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}
                                    ${data.industrial_scale ? `
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Industrial Scale:</td>
                                                    <td style="color: #111827;">${data.industrial_scale}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}
                                </table>
                            </td>
                        </tr>

                        <!-- Message Section -->
                        <tr>
                            <td style="padding: 20px 30px;">
                                <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #1F2937; padding-bottom: 8px; border-bottom: 2px solid #E5E7EB;">💬 Customer Message</h2>
                                <div style="background-color: #F0F9FF; border: 1px solid #BAE6FD; border-radius: 8px; padding: 15px; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${data.message}</div>
                            </td>
                        </tr>

                        <!-- Source Information Section -->
                        <tr>
                            <td style="padding: 20px 30px;">
                                <h2 style="margin: 0 0 15px 0; font-size: 18px; color: #1F2937; padding-bottom: 8px; border-bottom: 2px solid #E5E7EB;">📊 Source Information</h2>
                                
                                <table width="100%" cellpadding="8" cellspacing="0">
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Source:</td>
                                                    <td style="color: #111827;">${data.source || 'Website Direct'}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr><td style="height: 8px;"></td></tr>
                                    <tr>
                                        <td style="background-color: #F9FAFB; border-left: 4px solid #3B82F6; border-radius: 8px; padding: 12px;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="font-weight: 600; color: #374151; width: 140px;">Submitted:</td>
                                                    <td style="color: #111827;">${new Date().toLocaleString('en-IN', { 
                                                      timeZone: 'Asia/Kolkata',
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                      hour: '2-digit',
                                                      minute: '2-digit'
                                                    })}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #1F2937; color: #ffffff; padding: 20px 30px; text-align: center;">
                                <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>🚀 Next Steps:</strong> Contact customer within 24 hours | Prepare customized solar proposal</p>
                                <p style="margin: 0; font-size: 14px;"><strong>Autosys Sunergy Solar Solutions</strong></p>
                                <p style="margin: 5px 0; font-size: 14px;">📍 A-1/C, Pologround Road, Indore, Madhya Pradesh</p>
                                <p style="margin: 5px 0; font-size: 14px;">📞 +91 8818880540 | 📧 sales@autosyssunergy.com</p>
                                <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">This is an automated notification from your website contact form.</p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
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

/**
 * Generate HTML email template for customer reply
 */
export const generateResendCustomerReplyTemplate = (data: ContactFormData): { subject: string; html: string; text: string } => {
  const subject = `Thank you for your inquiry - Autosys Sunergy Solar Solutions`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - Autosys Sunergy</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #059669 0%, #10B981 100%); padding: 30px; text-align: center; color: #ffffff;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: 600;">🙏 Thank You, ${data.name}!</h1>
                                <p style="margin: 8px 0 0 0; font-size: 16px;">Your solar journey starts here with <strong>Autosys Sunergy</strong></p>
                            </td>
                        </tr>

                        <!-- Welcome Message -->
                        <tr>
                            <td style="padding: 30px;">
                                <div style="background-color: #F0FDF4; border-left: 4px solid #10B981; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                                    <h2 style="margin: 0 0 10px 0; color: #059669; font-size: 18px;">✅ We've Received Your Inquiry!</h2>
                                    <p style="margin: 0; color: #1F2937; line-height: 1.6;">Thank you for choosing Autosys Sunergy for your solar energy needs. We're excited to help you transition to clean, renewable energy and reduce your electricity bills significantly.</p>
                                </div>

                                <!-- Next Steps -->
                                <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                                    <h3 style="margin: 0 0 15px 0; color: #F59E0B; font-size: 16px;">⏰ What Happens Next?</h3>
                                    <ul style="margin: 0; padding-left: 20px; color: #1F2937; line-height: 1.8;">
                                        <li><strong>Within 24 hours:</strong> Our solar expert will contact you</li>
                                        <li><strong>Free Consultation:</strong> Discuss your energy needs and goals</li>
                                        <li><strong>Site Assessment:</strong> Professional evaluation of your property</li>
                                        <li><strong>Custom Proposal:</strong> Tailored solar solution with ROI analysis</li>
                                        <li><strong>Installation:</strong> Professional setup by certified technicians</li>
                                    </ul>
                                </div>

                                <!-- Contact Info -->
                                <div style="background-color: #F3F4F6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                                    <h3 style="margin: 0 0 15px 0; color: #1F2937; font-size: 16px;">📞 Need Immediate Assistance?</h3>
                                    <p style="margin: 5px 0; color: #1F2937;"><strong>Call us directly:</strong> <a href="tel:+918818880540" style="color: #059669; text-decoration: none;">+91 8818880540</a></p>
                                    <p style="margin: 5px 0; color: #1F2937;"><strong>Email:</strong> <a href="mailto:sales@autosyssunergy.com" style="color: #059669; text-decoration: none;">sales@autosyssunergy.com</a></p>
                                    <p style="margin: 5px 0; color: #1F2937;"><strong>Address:</strong> A-1/C, Pologround Road, Indore, Madhya Pradesh</p>
                                </div>

                                <!-- Benefits Grid -->
                                <table width="100%" cellpadding="10" cellspacing="0">
                                    <tr>
                                        <td width="50%" style="vertical-align: top;">
                                            <div style="background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 12px; border-radius: 6px; margin-bottom: 10px;">
                                                <h4 style="margin: 0 0 5px 0; color: #1E40AF; font-size: 14px;">🏆 18+ Years Experience</h4>
                                                <p style="margin: 0; font-size: 12px; color: #1F2937;">Trusted solar solutions provider</p>
                                            </div>
                                        </td>
                                        <td width="50%" style="vertical-align: top;">
                                            <div style="background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 12px; border-radius: 6px; margin-bottom: 10px;">
                                                <h4 style="margin: 0 0 5px 0; color: #1E40AF; font-size: 14px;">⚡ Premium Components</h4>
                                                <p style="margin: 0; font-size: 12px; color: #1F2937;">High-efficiency solar panels</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="50%" style="vertical-align: top;">
                                            <div style="background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 12px; border-radius: 6px;">
                                                <h4 style="margin: 0 0 5px 0; color: #1E40AF; font-size: 14px;">🛡️ 25-Year Warranty</h4>
                                                <p style="margin: 0; font-size: 12px; color: #1F2937;">Comprehensive coverage</p>
                                            </div>
                                        </td>
                                        <td width="50%" style="vertical-align: top;">
                                            <div style="background-color: #EFF6FF; border-left: 4px solid #3B82F6; padding: 12px; border-radius: 6px;">
                                                <h4 style="margin: 0 0 5px 0; color: #1E40AF; font-size: 14px;">💰 Maximum Savings</h4>
                                                <p style="margin: 0; font-size: 12px; color: #1F2937;">Up to 90% bill reduction</p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>

                                <!-- CTA Buttons -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 25px 0;">
                                    <tr>
                                        <td align="center">
                                            <a href="tel:+918818880540" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 5px;">📞 Call Now</a>
                                            <a href="https://www.autosyssunergy.com" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 5px;">🌐 Visit Website</a>
                                        </td>
                                    </tr>
                                </table>

                                <p style="text-align: center; color: #6B7280; font-size: 14px; margin-top: 20px;">
                                    Follow us for solar tips and updates
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #1F2937; color: #ffffff; padding: 20px; text-align: center;">
                                <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Autosys Sunergy - Leading Solar Solutions Provider</strong></p>
                                <p style="margin: 0 0 5px 0; font-size: 14px;">Making solar energy accessible and affordable for everyone</p>
                                <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.8;">
                                    This email was sent because you submitted a contact form on our website.<br>
                                    If you have any questions, please reply to this email or call us directly.
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
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

/**
 * Send team notification email using Resend
 */
export const sendResendTeamNotification = async (
  data: ContactFormData
): Promise<{ success: boolean; provider?: string; messageId?: string; error?: string }> => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ RESEND_API_KEY not configured. Skipping Resend email.');
      return { 
        success: false, 
        error: 'Resend API key not configured',
        provider: 'resend'
      };
    }

    const template = generateResendTeamNotificationTemplate(data);

    const emailData = await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: [RESEND_CONFIG.toEmail],
      replyTo: data.email || RESEND_CONFIG.replyToEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    const messageId = emailData.data?.id || 'unknown';
    console.log('✅ Resend team notification sent successfully:', messageId);
    
    return {
      success: true,
      provider: 'resend',
      messageId,
    };
  } catch (error) {
    console.error('❌ Resend team notification error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown Resend error',
      provider: 'resend',
    };
  }
};

/**
 * Send customer reply email using Resend
 */
export const sendResendCustomerReply = async (
  customerEmail: string,
  data: ContactFormData
): Promise<{ success: boolean; provider?: string; messageId?: string; error?: string }> => {
  try {
    if (!customerEmail) {
      return { 
        success: false, 
        error: 'Customer email not provided',
        provider: 'resend'
      };
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ RESEND_API_KEY not configured. Skipping customer email.');
      return { 
        success: false, 
        error: 'Resend API key not configured',
        provider: 'resend'
      };
    }

    const template = generateResendCustomerReplyTemplate(data);

    const emailData = await resend.emails.send({
      from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
      to: [customerEmail],
      replyTo: RESEND_CONFIG.replyToEmail,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    const messageId = emailData.data?.id || 'unknown';
    console.log(`✅ Resend customer reply sent to ${customerEmail}:`, messageId);
    
    return {
      success: true,
      provider: 'resend',
      messageId,
    };
  } catch (error) {
    console.error('❌ Resend customer reply error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown Resend error',
      provider: 'resend',
    };
  }
};

export default {
  sendResendTeamNotification,
  sendResendCustomerReply,
  generateResendTeamNotificationTemplate,
  generateResendCustomerReplyTemplate,
  RESEND_CONFIG,
};
