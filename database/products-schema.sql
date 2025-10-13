-- Supabase Product Management Schema
-- This schema handles the complete product management system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Product Categories Table
CREATE TABLE IF NOT EXISTS product_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sanity_id TEXT UNIQUE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(50), -- Lucide icon name
    features TEXT[], -- Array of features
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Brands Table
CREATE TABLE IF NOT EXISTS product_brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sanity_id TEXT UNIQUE,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    description TEXT,
    website_url TEXT,
    country VARCHAR(50),
    established_year INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Main Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sanity_id TEXT UNIQUE,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    short_description TEXT,
    description TEXT,
    model VARCHAR(100),
    sku VARCHAR(100),
    category_id UUID REFERENCES product_categories(id) ON DELETE SET NULL,
    brand_id UUID REFERENCES product_brands(id) ON DELETE SET NULL,
    subcategory VARCHAR(100),
    
    -- Pricing and availability
    price_range VARCHAR(50), -- e.g., "₹25,000 - ₹30,000"
    moq VARCHAR(50), -- Minimum Order Quantity
    warranty VARCHAR(100),
    lead_time VARCHAR(50),
    in_stock BOOLEAN DEFAULT true,
    
    -- Performance metrics
    efficiency VARCHAR(20),
    capacity VARCHAR(20),
    power_output VARCHAR(20),
    
    -- Ratings and popularity
    rating DECIMAL(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    
    -- SEO and metadata
    meta_title VARCHAR(200),
    meta_description TEXT,
    og_image_url TEXT,
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    sanity_asset_id TEXT,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(200),
    caption TEXT,
    image_type VARCHAR(20) DEFAULT 'product', -- product, installation, comparison, certificate
    is_primary BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Documents Table
CREATE TABLE IF NOT EXISTS product_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    sanity_asset_id TEXT,
    title VARCHAR(200) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(20), -- pdf, doc, docx, etc.
    document_type VARCHAR(30), -- datasheet, manual, certification, specification, installation, warranty
    file_size_kb INTEGER,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Videos Table
CREATE TABLE IF NOT EXISTS product_videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    youtube_url TEXT,
    video_type VARCHAR(30), -- demo, installation, review, comparison
    thumbnail_url TEXT,
    duration_seconds INTEGER,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Specifications Table (Key-Value pairs)
CREATE TABLE IF NOT EXISTS product_specifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    spec_key VARCHAR(100) NOT NULL,
    spec_value TEXT NOT NULL,
    spec_unit VARCHAR(20), -- kW, V, A, kg, etc.
    spec_category VARCHAR(50), -- electrical, physical, environmental, etc.
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Features Table
CREATE TABLE IF NOT EXISTS product_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    feature_text VARCHAR(200) NOT NULL,
    feature_description TEXT,
    icon_name VARCHAR(50), -- Lucide icon name
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Certifications Table
CREATE TABLE IF NOT EXISTS product_certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    certification_name VARCHAR(100) NOT NULL,
    certification_body VARCHAR(100),
    certificate_url TEXT,
    issue_date DATE,
    expiry_date DATE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Applications Table
CREATE TABLE IF NOT EXISTS product_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    application_name VARCHAR(100) NOT NULL,
    application_description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Compatibility Table (Many-to-Many relationship)
CREATE TABLE IF NOT EXISTS product_compatibility (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    compatible_product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    compatibility_type VARCHAR(50), -- direct, recommended, optional
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(product_id, compatible_product_id)
);

-- Product Reviews/Testimonials Table
CREATE TABLE IF NOT EXISTS product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sanity_id TEXT UNIQUE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    customer_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100),
    location VARCHAR(100),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    review_date DATE DEFAULT CURRENT_DATE,
    avatar_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_verified BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_popular ON products(is_popular);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_documents_product_id ON product_documents(product_id);
CREATE INDEX IF NOT EXISTS idx_product_videos_product_id ON product_videos(product_id);
CREATE INDEX IF NOT EXISTS idx_product_specifications_product_id ON product_specifications(product_id);
CREATE INDEX IF NOT EXISTS idx_product_features_product_id ON product_features(product_id);
CREATE INDEX IF NOT EXISTS idx_product_certifications_product_id ON product_certifications(product_id);
CREATE INDEX IF NOT EXISTS idx_product_applications_product_id ON product_applications(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_product_categories_updated_at BEFORE UPDATE ON product_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_brands_updated_at BEFORE UPDATE ON product_brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON product_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_compatibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for published products
CREATE POLICY "Public can read published product categories" ON product_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read active brands" ON product_brands FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published products" ON products FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read product images" ON product_images FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE products.id = product_images.product_id AND products.status = 'published')
);
CREATE POLICY "Public can read product documents" ON product_documents FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE products.id = product_documents.product_id AND products.status = 'published')
);
CREATE POLICY "Public can read product videos" ON product_videos FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE products.id = product_videos.product_id AND products.status = 'published')
);
CREATE POLICY "Public can read product specifications" ON product_specifications FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE products.id = product_specifications.product_id AND products.status = 'published')
);
CREATE POLICY "Public can read product features" ON product_features FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE products.id = product_features.product_id AND products.status = 'published')
);
CREATE POLICY "Public can read product certifications" ON product_certifications FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE products.id = product_certifications.product_id AND products.status = 'published')
);
CREATE POLICY "Public can read product applications" ON product_applications FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE products.id = product_applications.product_id AND products.status = 'published')
);
CREATE POLICY "Public can read product compatibility" ON product_compatibility FOR SELECT USING (
    EXISTS (SELECT 1 FROM products WHERE products.id = product_compatibility.product_id AND products.status = 'published')
);
CREATE POLICY "Public can read approved reviews" ON product_reviews FOR SELECT USING (
    status = 'approved' AND EXISTS (SELECT 1 FROM products WHERE products.id = product_reviews.product_id AND products.status = 'published')
);

-- Insert default categories
INSERT INTO product_categories (sanity_id, name, slug, description, icon_name, features) VALUES
('solar-panels', 'Solar Panels', 'solar-panels', 'High-efficiency solar panels for all applications', 'Zap', ARRAY['High Efficiency', 'Long Warranty', 'Weather Resistant', 'Various Technologies']),
('inverters', 'Inverters', 'inverters', 'Advanced inverters for optimal power conversion', 'Cpu', ARRAY['High Efficiency', 'MPPT Technology', 'Grid Integration', 'Remote Monitoring']),
('batteries', 'Batteries', 'batteries', 'Reliable energy storage solutions', 'Battery', ARRAY['Long Life', 'Fast Charging', 'Safety Features', 'High Capacity']),
('mounting', 'Mounting Systems', 'mounting', 'Robust mounting and tracking systems', 'Wrench', ARRAY['Easy Installation', 'Weather Resistant', 'Adjustable', 'Durable']),
('accessories', 'Accessories', 'accessories', 'Essential solar accessories and components', 'Cable', ARRAY['Quality Components', 'Easy Installation', 'Weather Proof', 'Certified']),
('monitoring', 'Monitoring Systems', 'monitoring', 'Smart monitoring and control systems', 'Monitor', ARRAY['Real-time Data', 'Remote Access', 'Analytics', 'Alerts'])
ON CONFLICT (sanity_id) DO NOTHING;

-- Insert default brands
INSERT INTO product_brands (sanity_id, name, slug, description, country) VALUES
('novasys', 'Novasys', 'novasys', 'Leading solar panel manufacturer', 'India'),
('microtek', 'Microtek', 'microtek', 'Advanced inverter technology', 'India'),
('luminous', 'Luminous', 'luminous', 'Power solutions and batteries', 'India'),
('tata-solar', 'Tata Solar', 'tata-solar', 'Trusted solar solutions', 'India'),
('waaree', 'Waaree', 'waaree', 'Solar energy solutions', 'India')
ON CONFLICT (sanity_id) DO NOTHING;
