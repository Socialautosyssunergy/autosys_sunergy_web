/**
 * Supabase Utilities - FORMS & LEAD CAPTURE ONLY
 * 
 * ⚠️ IMPORTANT: Supabase is used EXCLUSIVELY for:
 * - Contact form submissions
 * - Product inquiry forms
 * - Service inquiry forms
 * - Lead capture popups
 * 
 * Products, services, and other content use static data files.
 * Blogs use Sanity CMS.
 */

import { createSupabaseServiceClient } from '@/lib/supabase';
import { sendNotificationEmail, ContactFormData, ProductInquiryData, ServiceInquiryData } from './emailService';
import { sendResendTeamNotification } from './resendService';

// Form submission types
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  form_type?: string;
  user_type?: string;
  subject?: string;
  message: string;
  location?: string;
  system_type?: string;
  monthly_bill?: string;
  business_type?: string;
  power_consumption?: string;
  industrial_scale?: string;
  source?: string;
  priority?: string;
  status?: string;
  metadata?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  referer?: string;
  email_sent?: boolean;
  email_sent_at?: string;
  email_error?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product_name: string;
  product_category?: string;
  quantity_required?: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
  location?: string;
  specifications?: string;
  priority?: string;
  status?: string;
  source?: string;
  metadata?: Record<string, unknown>;
  ip_address?: string;
  email_sent?: boolean;
  email_sent_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_name: string;
  service_category?: string;
  service_type?: string;
  project_timeline?: string;
  budget_range?: string;
  property_type?: string;
  property_size?: string;
  current_monthly_bill?: string;
  message?: string;
  location?: string;
  special_requirements?: string;
  priority?: string;
  status?: string;
  source?: string;
  metadata?: Record<string, unknown>;
  ip_address?: string;
  email_sent?: boolean;
  email_sent_at?: string;
  created_at?: string;
  updated_at?: string;
}

// Helper function to get client IP from request headers
export const getClientIP = (headers: Headers): string => {
  const forwarded = headers.get('x-forwarded-for');
  const realIP = headers.get('x-real-ip');
  const cfConnectingIP = headers.get('cf-connecting-ip');
  
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  return '127.0.0.1';
};

// ============================================================================
// FORM SUBMISSION FUNCTIONS (ONLY USE OF SUPABASE)
// ============================================================================

/**
 * Submit Contact Form
 * Saves form submission to Supabase and sends email notifications
 */
export const submitContactForm = async (
  formData: ContactFormData & {
    ip_address?: string;
    user_agent?: string;
    referer?: string;
  }
) => {
  // Use service role client to bypass RLS for public form submissions
  const supabaseService = createSupabaseServiceClient();
  
  if (!supabaseService) {
    console.warn('Supabase not configured');
    throw new Error('Database not available');
  }
  
  try {
    // Insert contact submission using service role (bypasses RLS)
    const { data, error } = await supabaseService
      .from('contact_submissions')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        form_type: formData.form_type,
        user_type: formData.user_type,
        subject: formData.subject,
        message: formData.message,
        location: formData.location,
        system_type: formData.system_type,
        monthly_bill: formData.monthly_bill,
        business_type: formData.business_type,
        power_consumption: formData.power_consumption,
        industrial_scale: formData.industrial_scale,
        source: formData.source,
        priority: 'normal',
        status: 'pending',
        metadata: formData.metadata || {},
        ip_address: formData.ip_address,
        user_agent: formData.user_agent,
        referer: formData.referer,
        email_sent: false
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error submitting contact form:', error);
      throw new Error('Failed to submit contact form');
    }

    // Send email notification in background (try Resend first, fallback to Zoho)
    (async () => {
      try {
        console.log('📧 Attempting to send team notification via Resend...');
        let emailResult = await sendResendTeamNotification(formData as ContactFormData);
        
        // If Resend fails or is not configured, fallback to Zoho
        if (!emailResult.success) {
          console.log('⚠️ Resend failed, falling back to Zoho SMTP...');
          emailResult = await sendNotificationEmail('contact', formData);
        }
        
        if (emailResult.success && supabaseService) {
          // Update submission with email sent status
          await supabaseService
            .from('contact_submissions')
            .update({
              email_sent: true,
              email_sent_at: new Date().toISOString()
            })
            .eq('id', data.id);
        } else if (supabaseService) {
          // Update submission with email error
          await supabaseService
            .from('contact_submissions')
            .update({
              email_error: emailResult.error
            })
            .eq('id', data.id);
        }
      } catch (err) {
        console.error('Email notification error:', err);
      }
    })();
    
    return data as ContactSubmission;
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    throw error;
  }
};

// Product Inquiry Operations
export const submitProductInquiry = async (
  inquiryData: ProductInquiryData & {
    ip_address?: string;
    user_agent?: string;
    referer?: string;
  }
) => {
  // Use service role client to bypass RLS for public form submissions
  const supabaseService = createSupabaseServiceClient();
  
  if (!supabaseService) {
    console.warn('Supabase not configured');
    throw new Error('Database not available');
  }
  
  try {
    // Insert product inquiry using service role (bypasses RLS)
    const { data, error } = await supabaseService
      .from('product_inquiries')
      .insert([{
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        company: inquiryData.company,
        product_name: inquiryData.product_name,
        product_category: inquiryData.product_category,
        quantity_required: inquiryData.quantity_required,
        budget_range: inquiryData.budget_range,
        timeline: inquiryData.timeline,
        message: inquiryData.message,
        location: inquiryData.location,
        specifications: inquiryData.specifications,
        priority: 'normal',
        status: 'pending',
        source: 'website',
        metadata: inquiryData.metadata || {},
        ip_address: inquiryData.ip_address,
        email_sent: false
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error submitting product inquiry:', error);
      throw new Error('Failed to submit product inquiry');
    }

    // Send email notification in background (try Resend first, fallback to Zoho)
    (async () => {
      try {
        // Convert product inquiry to contact form format for email template
        const emailData: ContactFormData = {
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          company: inquiryData.company,
          subject: `Product Inquiry: ${inquiryData.product_name}`,
          message: `${inquiryData.message}\n\n--- Product Details ---\nProduct: ${inquiryData.product_name}\nCategory: ${inquiryData.product_category || 'Not specified'}\nQuantity: ${inquiryData.quantity_required || 'Not specified'}\nBudget: ${inquiryData.budget_range || 'Not specified'}\nTimeline: ${inquiryData.timeline || 'Not specified'}\nLocation: ${inquiryData.location || 'Not specified'}\nSpecifications: ${inquiryData.specifications || 'Not specified'}`,
          form_type: 'product_inquiry',
          source: 'product_inquiry',
          metadata: inquiryData.metadata
        };
        
        console.log('📧 Attempting to send product inquiry via Resend...');
        let emailResult = await sendResendTeamNotification(emailData);
        
        // If Resend fails or is not configured, fallback to Zoho
        if (!emailResult.success) {
          console.log('⚠️ Resend failed, falling back to Zoho SMTP...');
          emailResult = await sendNotificationEmail('product', inquiryData);
        }
        
        if (emailResult.success && supabaseService) {
          await supabaseService
            .from('product_inquiries')
            .update({
              email_sent: true,
              email_sent_at: new Date().toISOString()
            })
            .eq('id', data.id);
        }
      } catch (err) {
        console.error('Email notification error:', err);
      }
    })();
    
    return data as ProductInquiry;
  } catch (error) {
    console.error('Error in submitProductInquiry:', error);
    throw error;
  }
};

// Service Inquiry Operations
export const submitServiceInquiry = async (
  inquiryData: ServiceInquiryData & {
    ip_address?: string;
    user_agent?: string;
    referer?: string;
  }
) => {
  // Use service role client to bypass RLS for public form submissions
  const supabaseService = createSupabaseServiceClient();
  
  if (!supabaseService) {
    console.warn('Supabase not configured');
    throw new Error('Database not available');
  }
  
  try {
    // Insert service inquiry using service role (bypasses RLS)
    const { data, error } = await supabaseService
      .from('service_inquiries')
      .insert([{
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        company: inquiryData.company,
        service_name: inquiryData.service_name,
        service_category: inquiryData.service_category,
        service_type: inquiryData.service_type,
        project_timeline: inquiryData.project_timeline,
        budget_range: inquiryData.budget_range,
        property_type: inquiryData.property_type,
        property_size: inquiryData.property_size,
        current_monthly_bill: inquiryData.current_monthly_bill,
        message: inquiryData.message,
        location: inquiryData.location,
        special_requirements: inquiryData.special_requirements,
        priority: 'normal',
        status: 'pending',
        source: 'website',
        metadata: inquiryData.metadata || {},
        ip_address: inquiryData.ip_address,
        email_sent: false
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error submitting service inquiry:', error);
      throw new Error('Failed to submit service inquiry');
    }

    // Send email notification in background (try Resend first, fallback to Zoho)
    (async () => {
      try {
        // Convert service inquiry to contact form format for email template
        const emailData: ContactFormData = {
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          company: inquiryData.company,
          subject: `Service Inquiry: ${inquiryData.service_name}`,
          message: `${inquiryData.message}\n\n--- Service Details ---\nService: ${inquiryData.service_name}\nCategory: ${inquiryData.service_category || 'Not specified'}\nType: ${inquiryData.service_type || 'Not specified'}\nTimeline: ${inquiryData.project_timeline || 'Not specified'}\nBudget: ${inquiryData.budget_range || 'Not specified'}\nProperty Type: ${inquiryData.property_type || 'Not specified'}\nProperty Size: ${inquiryData.property_size || 'Not specified'}\nCurrent Bill: ${inquiryData.current_monthly_bill || 'Not specified'}\nLocation: ${inquiryData.location || 'Not specified'}\nSpecial Requirements: ${inquiryData.special_requirements || 'Not specified'}`,
          form_type: 'service_inquiry',
          source: 'service_inquiry',
          metadata: inquiryData.metadata
        };
        
        console.log('📧 Attempting to send service inquiry via Resend...');
        let emailResult = await sendResendTeamNotification(emailData);
        
        // If Resend fails or is not configured, fallback to Zoho
        if (!emailResult.success) {
          console.log('⚠️ Resend failed, falling back to Zoho SMTP...');
          emailResult = await sendNotificationEmail('service', inquiryData);
        }
        
        if (emailResult.success && supabaseService) {
          await supabaseService
            .from('service_inquiries')
            .update({
              email_sent: true,
              email_sent_at: new Date().toISOString()
            })
            .eq('id', data.id);
        }
      } catch (err) {
        console.error('Email notification error:', err);
      }
    })();
    
    return data as ServiceInquiry;
  } catch (error) {
    console.error('Error in submitServiceInquiry:', error);
    throw error;
  }
};

// Admin Operations (using service role key)
export const getContactSubmissions = async (status?: 'pending' | 'in_progress' | 'resolved' | 'spam') => {
  const supabaseService = createSupabaseServiceClient();
  
  if (!supabaseService) {
    console.warn('Supabase service client not configured');
    return [];
  }
  
  let query = supabaseService.from('contact_submissions').select('*');
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching contact submissions:', error);
    return [];
  }
  
  return data as ContactSubmission[];
};

export const getProductInquiries = async (status?: 'pending' | 'in_progress' | 'resolved' | 'spam') => {
  const supabaseService = createSupabaseServiceClient();
  
  if (!supabaseService) {
    console.warn('Supabase service client not configured');
    return [];
  }
  
  let query = supabaseService.from('product_inquiries').select('*');
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching product inquiries:', error);
    return [];
  }
  
  return data as ProductInquiry[];
};

export const getServiceInquiries = async (status?: 'pending' | 'in_progress' | 'resolved' | 'spam') => {
  const supabaseService = createSupabaseServiceClient();
  
  if (!supabaseService) {
    console.warn('Supabase service client not configured');
    return [];
  }
  
  let query = supabaseService.from('service_inquiries').select('*');
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching service inquiries:', error);
    return [];
  }
  
  return data as ServiceInquiry[];
};

export const updateContactSubmissionStatus = async (
  id: string, 
  status: 'pending' | 'in_progress' | 'resolved' | 'spam'
) => {
  const supabaseService = createSupabaseServiceClient();
  
  if (!supabaseService) {
    console.warn('Supabase service client not configured');
    throw new Error('Database not available');
  }
  
  const { data, error } = await supabaseService
    .from('contact_submissions')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating contact submission:', error);
    throw new Error('Failed to update contact submission');
  }
  
  return data as ContactSubmission;
};
