# Sanity CMS Architecture - Blog/SEO Only

## 📋 Overview

**Sanity CMS is now used EXCLUSIVELY for blog content management and SEO.**

This architectural change was implemented to streamline content management and leverage the strengths of both Sanity and Supabase for their optimal use cases.

---

## 🎯 Content Management Strategy

### ✅ Managed by Sanity (Blog/SEO)

- **Blog Posts** - Rich content with portable text, code blocks, and media
- **Blog Categories** - Categorization and tagging for blog organization
- **Blog Authors** - Author profiles and attribution

### ❌ NOT in Sanity (Managed by Supabase)

- **Products** - All product catalog, specifications, pricing
- **Product Categories** - Product categorization
- **Product Brands** - Brand information
- **Product Reviews** - Customer reviews and ratings
- **Services** - Service offerings
- **Projects** - Project portfolio
- **Contact Forms** - Form submissions and inquiries

---

## 🏗️ Architecture

### Sanity CMS Layer (Blog Only)
```
┌─────────────────────────────────────┐
│         Sanity Studio              │
│      (Blog Management UI)          │
│   Access: /studio                   │
└─────────────────────────────────────┘
                 │
                 │ Blog Content API
                 ▼
┌─────────────────────────────────────┐
│     Sanity Client (Read Only)      │
│  - Fetch blog posts                 │
│  - Fetch categories                 │
│  - Fetch authors                    │
│  - Image optimization (urlFor)     │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│      Next.js Blog Routes           │
│  - /blog (listing)                  │
│  - /blog/[slug] (post detail)      │
└─────────────────────────────────────┘
```

### Supabase Layer (Products, Services, Forms)
```
┌─────────────────────────────────────┐
│      Supabase Dashboard            │
│   (Database & Admin Panel)         │
└─────────────────────────────────────┘
                 │
                 │ PostgreSQL + REST API
                 ▼
┌─────────────────────────────────────┐
│     Supabase Client                │
│  - Products CRUD                    │
│  - Services CRUD                    │
│  - Contact forms                    │
│  - User authentication             │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│      Next.js App Routes            │
│  - /products                        │
│  - /services                        │
│  - /contact                         │
└─────────────────────────────────────┘
```

---

## 📁 Key Files & Locations

### Sanity Configuration (Blog Only)
```
/sanity/
├── sanity.config.ts          # Main Sanity Studio config (Blog-focused)
├── schemas/
│   ├── index.ts              # Schema registry (post, category, author ONLY)
│   ├── post.ts               # Blog post schema
│   ├── category.ts           # Blog category schema
│   └── author.ts             # Blog author schema
└── lib/
    ├── client.ts             # Sanity client initialization
    ├── queries.ts            # Blog queries
    └── utils.ts              # Blog helpers

/src/
├── lib/sanity.ts             # Sanity re-exports for app
├── types/sanity.ts           # Sanity type definitions (Blog only)
└── types/blog.ts             # Blog-specific types
```

### Supabase Configuration (Products, Services, etc.)
```
/src/
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── supabase/
│       └── products.ts       # Product queries & types
├── types/
│   ├── product.ts            # Product types (NO sanity_id)
│   └── database.ts           # Supabase database types
└── utils/
    ├── supabaseUtils.ts      # Supabase helpers
    └── productUtils.ts       # Product utilities (NO Sanity imports)
```

---

## 🔧 Environment Variables

```bash
# Sanity CMS (BLOG/SEO ONLY)
NEXT_PUBLIC_SANITY_PROJECT_ID=qepvii24
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...
SANITY_WEBHOOK_SECRET=...

# Supabase (Products, Services, Forms)
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## 🚀 Usage Examples

### ✅ Correct: Using Sanity for Blog Posts
```typescript
import { client } from '@/lib/sanity';
import { blogPostsQuery } from '@/lib/sanity';

// Fetch blog posts from Sanity
const posts = await client.fetch(blogPostsQuery);
```

### ✅ Correct: Using Supabase for Products
```typescript
import { getProducts } from '@/lib/supabase/products';

// Fetch products from Supabase
const { data: products } = await getProducts({ 
  category: 'solar-panels',
  limit: 10 
});
```

### ❌ Incorrect: Using Sanity for Products
```typescript
// DON'T DO THIS - Products are NOT in Sanity anymore
import { client } from '@/lib/sanity';
const products = await client.fetch(`*[_type == "product"]`); // ❌ Wrong!
```

---

## 📝 Migration Notes

### What Changed
1. **Removed from Sanity schemas:**
   - `product.ts` schema
   - `productCategory.ts` schema
   - `productBrand.ts` schema
   - `productReview.ts` schema

2. **Removed from types:**
   - `sanity_id` field from all product interfaces
   - Sanity-specific product type definitions

3. **Updated utilities:**
   - `productUtils.ts` - Removed Sanity image optimization
   - Product components - Now use Supabase exclusively

4. **Kept intact (Blog functionality):**
   - All blog components in `/src/components/blog/`
   - Blog types in `/src/types/blog.ts` and `/src/types/sanity.ts`
   - Blog routes in `/src/app/blog/`
   - Sanity Studio at `/studio`

### Benefits of This Architecture
- **Clear separation of concerns** - Content vs. Business Data
- **Optimized for purpose** - Sanity for rich content, Supabase for structured data
- **Better performance** - Direct database queries for products
- **Easier maintenance** - Single source of truth for each data type
- **Cost efficiency** - Reduced Sanity usage/costs

---

## 🔍 Verification Checklist

- [x] Sanity schemas only include: post, category, author
- [x] Product types removed `sanity_id` fields
- [x] `productUtils.ts` doesn't import Sanity
- [x] Blog functionality still works with Sanity
- [x] Products fetch from Supabase
- [x] Environment variables documented
- [x] Sanity Studio shows only blog content types

---

## 📞 Support

For questions about this architecture:
- Blog/Content: Use Sanity Studio (`/studio`)
- Products/Services: Use Supabase Dashboard
- Technical issues: Check console for errors

---

**Last Updated:** November 12, 2025
**Version:** 2.0 (Sanity Blog-Only Architecture)
