# Complete Product Management System Setup Guide

This guide walks you through setting up a complete product management system using Sanity CMS for content management and Supabase for data storage.

## 🏗️ Architecture Overview

```
Sanity CMS (Content Management) 
    ↓ (Webhook on Publish)
Supabase Database (Data Storage)
    ↓ (API Queries)
Next.js Frontend (Product Display)
```

## 📋 Prerequisites

- Supabase account and project
- Sanity account and project
- Next.js application
- Basic knowledge of React/TypeScript

## 🚀 Setup Steps

### 1. Database Setup (Supabase)

1. **Run the Database Schema**
   ```sql
   -- Execute the SQL script in Supabase SQL Editor
   -- File: database/products-schema.sql
   ```

2. **Set Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### 2. Sanity CMS Setup

1. **Install Dependencies**
   ```bash
   npm install @sanity/client @sanity/image-url
   ```

2. **Deploy Schemas to Sanity Studio**
   ```bash
   cd sanity
   npm run dev
   ```
   - Navigate to your Sanity Studio
   - Schemas will be automatically loaded

3. **Set Environment Variables**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token_with_write_permissions
   SANITY_WEBHOOK_SECRET=your_webhook_secret (optional)
   ```

### 3. Webhook Configuration

1. **Set up Sanity Webhook**
   - Go to Sanity Studio Settings → API → Webhooks
   - Add webhook URL: `https://your-domain.com/api/sanity/webhook`
   - Select documents: `product`, `productCategory`, `productBrand`, `productReview`
   - Secret: Set the same value as `SANITY_WEBHOOK_SECRET`

2. **Test Webhook**
   - Create/update a product in Sanity
   - Check your Supabase database for synced data

## 📊 Content Management Workflow

### Managing Product Categories

1. **In Sanity Studio:**
   - Go to "Product Category"
   - Add category name, description, icon name (Lucide icon)
   - Set features and sort order
   - Publish

2. **Data Flow:**
   - Sanity webhook triggers on publish
   - API syncs to Supabase `product_categories` table
   - Frontend fetches from Supabase

### Managing Product Brands

1. **In Sanity Studio:**
   - Go to "Product Brand"
   - Add brand name, logo, description
   - Set country and website
   - Publish

### Managing Products

1. **In Sanity Studio:**
   - Go to "Product"
   - Fill out all sections:
     - **Basic Information**: Title, description, category, brand
     - **Product Details**: Features, specifications, applications
     - **Media & Documents**: Images, videos, PDFs
     - **Specifications**: Technical specs with units
     - **Pricing & Availability**: MOQ, warranty, stock status
     - **SEO & Meta**: SEO optimization fields

2. **Features:**
   - **Rich Media Management**: Upload multiple images, documents, videos
   - **Specifications System**: Categorized key-value specs with units
   - **Document Management**: Datasheets, manuals, certificates
   - **Video Integration**: YouTube video embedding
   - **SEO Optimization**: Meta tags and descriptions
   - **Inventory Tracking**: Stock status and lead times

### Managing Reviews

1. **In Sanity Studio:**
   - Go to "Product Review"
   - Link to product, add customer details
   - Set rating and review text
   - Moderate with approval status

## 🔧 Frontend Integration

### Using the Data Layer

```typescript
import { 
  getProducts, 
  getProductBySlug,
  getProductCategories,
  getProductStats 
} from '@/lib/supabase/products';

// Get paginated products with filters
const { data: products, count } = await getProducts({
  category: 'solar-panels',
  featured: true,
  limit: 12
});

// Get single product
const product = await getProductBySlug('mono-solar-panel-550w');

// Get categories for navigation
const categories = await getProductCategories();
```

### Backward Compatibility

The system maintains backward compatibility with existing code:

```typescript
// Legacy imports still work
import { 
  allProducts,
  productCategories,
  getFeaturedProducts 
} from '@/data/products';

// But now powered by Supabase
```

## 🎨 Customization

### Adding New Product Fields

1. **Update Sanity Schema** (`sanity/schemas/product.ts`)
2. **Update Database Schema** (Add column to Supabase)
3. **Update Sync Logic** (`src/app/api/sanity/webhook/route.ts`)
4. **Update TypeScript Types** (`src/types/product.ts`)

### Custom Document Types

1. **Extend Document Schema:**
   ```typescript
   {
     name: 'documentType',
     title: 'Document Type',
     type: 'string',
     options: {
       list: [
         { title: 'Datasheet', value: 'datasheet' },
         { title: 'Manual', value: 'manual' },
         { title: 'Your Custom Type', value: 'custom' }
       ]
     }
   }
   ```

### Image Optimization

```typescript
import { optimizeImageUrl } from '@/utils/productUtils';

// Auto-optimize images
const optimizedUrl = optimizeImageUrl(imageUrl, {
  width: 400,
  quality: 85,
  format: 'webp'
});
```

## 🔒 Security Considerations

### Row Level Security (RLS)

- Public read access for published products only
- Authenticated admin access for management
- Review moderation system

### API Security

- Webhook signature verification
- Environment variable protection
- Service role key for backend operations

## 📈 Performance Optimization

### Caching Strategy

1. **Client-Side Caching:**
   ```typescript
   import { setCacheItem, getCacheItem } from '@/utils/productUtils';
   
   // Cache products list
   setCacheItem('products:featured', products, 30); // 30 minutes
   ```

2. **Database Indexes:**
   - Pre-created indexes on common query fields
   - Optimized for category, brand, and status filtering

### Image Optimization

- Automatic WebP conversion
- Responsive image generation
- CDN integration via Sanity

## 🚨 Troubleshooting

### Common Issues

1. **Webhook Not Firing:**
   - Check webhook URL and secret
   - Verify network connectivity
   - Check Sanity webhook logs

2. **Data Not Syncing:**
   - Check API logs in Vercel/console
   - Verify environment variables
   - Check Supabase RLS policies

3. **Images Not Loading:**
   - Verify Sanity CDN access
   - Check image optimization settings
   - Ensure proper asset references

### Debugging

```typescript
// Enable debug logging
console.log('Product sync payload:', payload);

// Check database state
const products = await supabase.from('products').select('*');
console.log('Current products:', products);
```

## 📱 Mobile Responsiveness

The system includes mobile-optimized views:
- Compact product cards for mobile
- Touch-friendly interfaces
- Optimized image loading

## 🔄 Data Migration

### From Static Data

1. **Export existing data to JSON**
2. **Create migration script**
3. **Import to Sanity via API**
4. **Verify sync to Supabase**

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API logs
3. Test webhook connectivity
4. Verify environment variables

---

## 🎯 Quick Start Checklist

- [ ] Run Supabase schema SQL
- [ ] Configure environment variables
- [ ] Deploy Sanity schemas
- [ ] Set up webhook
- [ ] Create test category
- [ ] Create test brand
- [ ] Create test product
- [ ] Verify data sync
- [ ] Test frontend display

Once completed, you'll have a fully functional product management system with:
- ✅ Rich content management via Sanity
- ✅ Scalable data storage via Supabase
- ✅ Real-time sync between systems
- ✅ SEO-optimized frontend
- ✅ Mobile-responsive design
- ✅ Advanced media management
- ✅ Comprehensive product features
