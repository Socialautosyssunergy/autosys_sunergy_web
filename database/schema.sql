-- Supabase Database Schema for Autosys Sunergy Contact Forms and Email Notifications

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact submissions table (enhanced for multiple form types)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Basic contact information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    
    -- Form type and category
    form_type VARCHAR(50) NOT NULL DEFAULT 'general', -- 'general', 'homepage', 'contact', 'product_inquiry', 'service_inquiry'
    user_type VARCHAR(50), -- 'residential', 'commercial', 'industrial'
    
    -- Contact details
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    location VARCHAR(255),
    
    -- Product/Service specific fields
    product_id UUID,
    service_id UUID,
    system_type VARCHAR(100), -- 'residential', 'commercial', 'industrial', 'agricultural'
    monthly_bill VARCHAR(50),
    property_size VARCHAR(100),
    business_type VARCHAR(100),
    power_consumption VARCHAR(100),
    industrial_scale VARCHAR(100),
    
    -- Request details
    priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    source VARCHAR(100), -- 'website', 'homepage', 'contact_page', 'product_page', 'service_page'
    
    -- Status and tracking
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'resolved', 'spam'
    assigned_to VARCHAR(255),
    follow_up_date TIMESTAMP,
    
    -- Metadata and tracking
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    referer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    -- Email notification status
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMP,
    email_error TEXT,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Product inquiries table (specific for product queries)
CREATE TABLE IF NOT EXISTS product_inquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Contact information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    
    -- Product details
    product_id UUID,
    product_name VARCHAR(255),
    product_category VARCHAR(100),
    quantity_required INTEGER,
    budget_range VARCHAR(100),
    timeline VARCHAR(100),
    application_type VARCHAR(255),
    
    -- Requirements
    message TEXT NOT NULL,
    specifications TEXT,
    location VARCHAR(255),
    
    -- Status and tracking
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'normal',
    source VARCHAR(100) DEFAULT 'website',
    
    -- Email notification
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMP,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Service inquiries table (specific for service queries)
CREATE TABLE IF NOT EXISTS service_inquiries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Contact information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    
    -- Service details
    service_id UUID,
    service_name VARCHAR(255),
    service_category VARCHAR(100), -- 'residential', 'commercial', 'industrial'
    service_type VARCHAR(100), -- 'installation', 'maintenance', 'consultation', 'design'
    project_timeline VARCHAR(100),
    budget_range VARCHAR(100),
    
    -- Property/Project details
    property_type VARCHAR(100), -- 'house', 'apartment', 'office', 'factory', 'warehouse'
    property_size VARCHAR(100),
    roof_type VARCHAR(100),
    current_monthly_bill VARCHAR(100),
    preferred_system_size VARCHAR(100),
    
    -- Requirements
    message TEXT NOT NULL,
    special_requirements TEXT,
    location VARCHAR(255),
    
    -- Status and tracking
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'normal',
    source VARCHAR(100) DEFAULT 'website',
    
    -- Email notification
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMP,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Email notification logs table
CREATE TABLE IF NOT EXISTS email_notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Reference to the inquiry
    reference_type VARCHAR(50) NOT NULL, -- 'contact_submission', 'product_inquiry', 'service_inquiry'
    reference_id UUID NOT NULL,
    
    -- Email details
    email_type VARCHAR(50) NOT NULL, -- 'contact_notification', 'product_inquiry_notification', 'service_inquiry_notification'
    from_email VARCHAR(255) NOT NULL,
    to_emails TEXT[] NOT NULL,
    cc_emails TEXT[],
    bcc_emails TEXT[],
    
    subject VARCHAR(500) NOT NULL,
    html_content TEXT,
    text_content TEXT,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'bounced'
    provider VARCHAR(50), -- 'resend', 'nodemailer', 'sendgrid'
    provider_message_id VARCHAR(255),
    error_message TEXT,
    
    -- Attempts and timing
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    sent_at TIMESTAMP,
    last_attempt_at TIMESTAMP,
    next_retry_at TIMESTAMP,
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_form_type ON contact_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email_sent ON contact_submissions(email_sent);

CREATE INDEX IF NOT EXISTS idx_product_inquiries_status ON product_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_product_inquiries_created_at ON product_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_inquiries_email_sent ON product_inquiries(email_sent);

CREATE INDEX IF NOT EXISTS idx_service_inquiries_status ON service_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_service_inquiries_created_at ON service_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_inquiries_email_sent ON service_inquiries(email_sent);

CREATE INDEX IF NOT EXISTS idx_email_notifications_status ON email_notifications(status);
CREATE INDEX IF NOT EXISTS idx_email_notifications_reference ON email_notifications(reference_type, reference_id);
CREATE INDEX IF NOT EXISTS idx_email_notifications_created_at ON email_notifications(created_at DESC);

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers
CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_inquiries_updated_at 
    BEFORE UPDATE ON product_inquiries 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_inquiries_updated_at 
    BEFORE UPDATE ON service_inquiries 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_notifications_updated_at 
    BEFORE UPDATE ON email_notifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Optional but recommended
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

-- Policy for service role (full access)
CREATE POLICY "Service role can manage all data" ON contact_submissions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all data" ON product_inquiries
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all data" ON service_inquiries
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all data" ON email_notifications
    FOR ALL USING (auth.role() = 'service_role');

-- Policy for anon role (insert only)
CREATE POLICY "Anonymous can insert contact submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anonymous can insert product inquiries" ON product_inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anonymous can insert service inquiries" ON service_inquiries
    FOR INSERT WITH CHECK (true);
