# Complete Product Management System Setup

## 🎯 Overview
This system provides a complete product management solution using Sanity CMS for content management and Supabase for database storage. You can manage all product details, images, documents, videos, and more through the Sanity admin panel.

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Sanity CMS    │    │    Webhook API   │    │   Supabase DB   │
│  (Admin Panel)  ├───►│  (Sync Service)  ├───►│ (PostgreSQL)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                                              │
         └──────────────────────────────────────────────┼─────────┐
                                                        │         │
                                            ┌───────────▼─────┐   │
                                            │  Next.js Frontend │   │
                                            │  (Products Page)  │◄──┘
                                            └───────────────────┘
```

## 🚀 Quick Start

### 1. Database Setup (Supabase)

1. **Run the database schema:**
   ```sql
   -- Execute the complete schema in Supabase SQL Editor
   -- File: database/products-schema.sql
   ```

2. **Enable Row Level Security:**
   - The schema includes RLS policies for secure data access
   - Public read access for products, admin-only write access

3. **Set up environment variables:**
   ```bash
   # Add to .env.local
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### 2. Sanity CMS Setup

1. **Install Sanity Studio dependencies** (if not already done):
   ```bash
   npm install @sanity/vision
   ```

2. **Configure Sanity project:**
   - Update `sanity.config.ts` with your project ID and dataset
   - Ensure all product schemas are registered

3. **Set up webhook:**
   ```bash
   # Add to .env.local
   SANITY_WEBHOOK_SECRET=your_webhook_secret
   ```

### 3. Webhook Configuration

1. **In Sanity Studio:**
   - Go to API settings
   - Create new webhook: `https://yourdomain.com/api/sanity/webhook`
   - Set trigger: Document changes
   - Add your webhook secret

## 📊 Database Schema

### Core Tables
- **products** - Main product information
- **product_categories** - Product categorization
- **product_brands** - Brand information
- **product_images** - Image gallery
- **product_documents** - PDF catalogs, manuals
- **product_videos** - Video content
- **product_specifications** - Technical specs
- **product_features** - Key features
- **product_certifications** - Certifications & standards
- **product_applications** - Use cases
- **product_reviews** - Customer testimonials

### Key Features
- 🔒 Row Level Security enabled
- 🔗 Proper foreign key relationships
- 📈 Indexes for performance
- 🛡️ Data validation constraints
- 🚀 Triggers for auto-updates

## 🎨 Sanity Schemas

### Product Schema (`product.ts`)
```typescript
{
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info' },
    { name: 'media', title: 'Media' },
    { name: 'technical', title: 'Technical' },
    { name: 'marketing', title: 'Marketing' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    // Rich content management for all product aspects
  ]
}
```

### Available Schemas
- **Product** - Complete product management
- **Product Category** - Category management
- **Product Brand** - Brand information
- **Product Review** - Customer testimonials

## 🔄 Data Flow

### 1. Content Creation
1. Create/edit product in Sanity Studio
2. Add images, documents, videos, specifications
3. Set categories, brands, pricing
4. Publish the document

### 2. Automatic Sync
1. Sanity webhook triggers on publish
2. API endpoint `/api/sanity/webhook` receives data
3. Data is transformed and saved to Supabase
4. Frontend automatically displays updated data

### 3. Frontend Display
1. Products page loads data from Supabase
2. Supports filtering, searching, categorization
3. Responsive design for all devices
4. SEO optimized with structured data

## 🛠️ API Endpoints

### Webhook Endpoint
```typescript
POST /api/sanity/webhook
Content-Type: application/json
x-sanity-webhook-signature: <signature>

// Handles: create, update, delete operations
// Syncs: products, categories, brands, reviews
```

### Database Functions
```typescript
// Get all products with filters
getProducts(filters?: ProductFilters): Promise<Product[]>

// Get single product with details
getProductById(id: string): Promise<Product | null>

// Get categories
getProductCategories(): Promise<ProductCategory[]>

// Get brands
getProductBrands(): Promise<ProductBrand[]>

// Get testimonials
getProductTestimonials(): Promise<ProductTestimonial[]>

// Get product stats
getProductStats(): Promise<ProductStats>
```

## 🎯 Content Management Features

### ✅ What You Can Manage
- **Basic Info**: Title, description, SKU, pricing
- **Images**: Hero image, gallery with captions
- **Documents**: PDFs, catalogs, manuals
- **Videos**: Product demos, installation guides
- **Technical Specs**: Detailed specifications
- **Features**: Key selling points
- **Certifications**: Standards and compliance
- **Applications**: Use cases and industries
- **SEO**: Meta titles, descriptions, keywords
- **Availability**: Stock status, lead times

### 🖼️ Media Management
- **Images**: Automatic CDN optimization via Sanity
- **Documents**: Direct file uploads with metadata
- **Videos**: YouTube/Vimeo links or direct uploads
- **Responsive**: Automatic image sizing for devices

### 🏷️ Organization
- **Categories**: Hierarchical categorization
- **Brands**: Brand association and filtering
- **Tags**: Flexible tagging system
- **Status**: Published/draft/archived states

## 🔧 Troubleshooting

### Common Issues

1. **Webhook not triggering:**
   - Check webhook URL in Sanity settings
   - Verify webhook secret matches environment variable
   - Check Supabase connection

2. **Data not syncing:**
   - Check API logs in Vercel/deployment platform
   - Verify Supabase credentials
   - Check table permissions

3. **Images not loading:**
   - Verify Sanity CDN configuration
   - Check image field structure in schema

4. **TypeScript errors:**
   - Ensure all types are properly defined
   - Check import paths for Sanity client
   - Verify Supabase type definitions

### Debugging Tools

```typescript
// Enable debug logging
console.log('Webhook payload:', JSON.stringify(body, null, 2));

// Check Supabase connection
const { data, error } = await supabase.from('products').select('count');
console.log('DB connection:', { data, error });

// Verify Sanity client
const products = await sanityClient.fetch('*[_type == "product"]');
console.log('Sanity products:', products.length);
```

## 🚀 Deployment

### Environment Variables
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=
SANITY_WEBHOOK_SECRET=
```

### Build Process
```bash
# Install dependencies
npm install

# Build Sanity schemas
npm run sanity:build

# Build Next.js application
npm run build

# Deploy to production
npm run deploy
```

## 📈 Performance Optimizations

### Database
- Indexes on frequently queried fields
- Materialized views for complex queries
- Connection pooling for scalability

### Frontend
- Image optimization with Sanity CDN
- Lazy loading for media content
- Efficient data fetching with proper caching

### Caching Strategy
- Static generation for product listings
- ISR (Incremental Static Regeneration) for updates
- CDN caching for media assets

## 🎉 Success!

Your complete product management system is now ready! 

### What's Working:
✅ Database schema with 12+ tables
✅ Sanity CMS with rich content management
✅ Real-time webhook synchronization
✅ Frontend product listing and details
✅ Image optimization and responsive design
✅ SEO optimization with structured data
✅ TypeScript type safety throughout

### Next Steps:
1. Customize the product schemas for your specific needs
2. Add more product categories and brands
3. Configure advanced filtering options
4. Set up analytics and performance monitoring
5. Add e-commerce features (cart, checkout) if needed

Happy managing! 🚀
