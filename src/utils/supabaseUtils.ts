import { supabase, createSupabaseServiceClient } from '@/lib/supabase';
import { Database } from '@/types/database';
import { sendNotificationEmail, ContactFormData, ProductInquiryData, ServiceInquiryData } from './emailService';

export type Product = Database['public']['Tables']['products']['Row'];
export type Service = Database['public']['Tables']['services']['Row'];
export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
export type ProductInquiry = Database['public']['Tables']['product_inquiries']['Row'];
export type ServiceInquiry = Database['public']['Tables']['service_inquiries']['Row'];

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

// Product Operations
export const getProducts = async (category?: string) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }
  
  let query = supabase.from('products').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data as Product[];
};

export const getProductById = async (id: string) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }
  
  return data as Product;
};

export const searchProducts = async (query: string) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error searching products:', error);
    return [];
  }
  
  return data as Product[];
};

// Service Operations
export const getServices = async (category?: string) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }
  
  let query = supabase.from('services').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }
  
  return data as Service[];
};

export const getServiceById = async (id: string) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching service:', error);
    return null;
  }
  
  return data as Service;
};

// Blog Operations
export const getBlogPosts = async (published: boolean = true) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', published)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  
  return data as BlogPost[];
};

export const getBlogPostBySlug = async (slug: string) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  
  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
  
  // Increment view count
  const { error: updateError } = await supabase
    .from('blog_posts')
    .update({ views: data.views + 1 })
    .eq('id', data.id);
  
  if (updateError) {
    console.error('Error updating view count:', updateError);
  }
  
  return data as BlogPost;
};

// Project Operations
export const getProjects = async (category?: string) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }
  
  let query = supabase.from('projects').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return data as Project[];
};

export const getProjectById = async (id: string) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }
  
  return data as Project;
};

// Enhanced Contact Operations with Email Notifications
export const submitContactForm = async (
  formData: ContactFormData & {
    ip_address?: string;
    user_agent?: string;
    referer?: string;
  }
) => {
  if (!supabase) {
    console.warn('Supabase not configured');
    throw new Error('Database not available');
  }
  
  try {
    // Insert contact submission
    const { data, error } = await supabase
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

    // Send email notification in background
    sendNotificationEmail('contact', formData)
      .then(async (emailResult) => {
        if (emailResult.success && supabase) {
          // Update submission with email sent status
          await supabase
            .from('contact_submissions')
            .update({
              email_sent: true,
              email_sent_at: new Date().toISOString()
            })
            .eq('id', data.id);
        } else if (supabase) {
          // Update submission with email error
          await supabase
            .from('contact_submissions')
            .update({
              email_error: emailResult.error
            })
            .eq('id', data.id);
        }
      })
      .catch(console.error);
    
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
  if (!supabase) {
    console.warn('Supabase not configured');
    throw new Error('Database not available');
  }
  
  try {
    // Insert product inquiry
    const { data, error } = await supabase
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

    // Send email notification in background
    sendNotificationEmail('product', inquiryData)
      .then(async (emailResult) => {
        if (emailResult.success && supabase) {
          await supabase
            .from('product_inquiries')
            .update({
              email_sent: true,
              email_sent_at: new Date().toISOString()
            })
            .eq('id', data.id);
        }
      })
      .catch(console.error);
    
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
  if (!supabase) {
    console.warn('Supabase not configured');
    throw new Error('Database not available');
  }
  
  try {
    // Insert service inquiry
    const { data, error } = await supabase
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

    // Send email notification in background
    sendNotificationEmail('service', inquiryData)
      .then(async (emailResult) => {
        if (emailResult.success && supabase) {
          await supabase
            .from('service_inquiries')
            .update({
              email_sent: true,
              email_sent_at: new Date().toISOString()
            })
            .eq('id', data.id);
        }
      })
      .catch(console.error);
    
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
