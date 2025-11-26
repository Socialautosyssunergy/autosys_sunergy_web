# Architecture Overview - Final Configuration

## 🎯 System Architecture

**Simplified, Efficient, and Maintainable**

This website uses a three-layer architecture optimized for performance and maintainability:

```
┌──────────────────────────────────────────────────────────┐
│                  AUTOSYS SUNERGY WEBSITE                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌───────────────┐    │
│  │   SANITY   │  │  SUPABASE  │  │ STATIC FILES  │    │
│  │  (Blogs)   │  │  (Forms)   │  │  (Products)   │    │
│  └────────────┘  └────────────┘  └───────────────┘    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 📊 Data Management Strategy

### ✅ **Sanity CMS** - Blog Content & SEO

**Purpose:** Rich content management for marketing and SEO

**Used For:**
- 📝 Blog posts (articles, guides, news)
- 📁 Blog categories
- ✍️ Blog authors
- 🖼️ Blog images and media

**Why Sanity for Blogs?**
- Rich text editor with portable text
- Excellent image optimization (`urlFor`)
- Built-in versioning and preview
- Optimized for content creators

**Access:** `/studio` (Sanity Studio)

---

### ✅ **Supabase** - Forms & Lead Capture ONLY

**Purpose:** Store and manage customer inquiries and leads

**Used For:**
- 📧 Contact form submissions
- 🛒 Product inquiry forms
- 🔧 Service inquiry forms
- 💬 Lead capture popups
- 📊 Admin dashboard for viewing leads

**Why Supabase for Forms?**
- Real-time database
- Row Level Security (RLS)
- Easy to query and filter
- Built-in authentication for admin
- Email integration

**NOT Used For:**
- ❌ Product catalog
- ❌ Service listings
- ❌ Blog content
- ❌ Project portfolio

---

### ✅ **Static Files** - Products, Services, Projects

**Purpose:** Fast, reliable content delivery without database overhead

**Used For:**
- 📦 Product catalog (all products)
- 🔧 Service offerings
- 🏗️ Project portfolio
- 📄 Static pages

**Why Static Files?**
- ⚡ Instant loading (no database queries)
- 💰 No database costs
- 🔒 Secure (no external dependencies)
- 📝 Easy to update (just edit files)
- 🚀 Better for SEO (static generation)

**Location:**
- Products: `/src/data/products/`
- Services: `/src/data/services/`
- Projects: `/src/data/projects/`

---

## 🏗️ Detailed Architecture

### 1. Blog System (Sanity)

```
User → /blog → Sanity Client → Sanity Cloud → Blog Posts
              ↓
         Rich Content (Portable Text)
         Optimized Images (urlFor)
         SEO Metadata
```

**Files:**
- `sanity/schemas/` - Blog schemas (post, category, author)
- `src/app/blog/` - Blog routes
- `src/components/blog/` - Blog components
- `src/lib/sanity.ts` - Sanity client

**Example:**
```typescript
import { client } from '@/lib/sanity';

const posts = await client.fetch(`*[_type == "post"]`);
```

---

### 2. Forms System (Supabase)

```
User fills form → API Route → Supabase Client → Supabase Database
                  ↓
            Email Notification (Resend/Zoho)
                  ↓
            Admin Dashboard (View/Manage)
```

**Tables:**
- `contact_submissions` - General contact forms
- `product_inquiries` - Product-specific inquiries
- `service_inquiries` - Service-specific inquiries

**Files:**
- `src/utils/supabaseUtils.ts` - Form submission functions
- `src/app/api/contact/` - Contact API route
- `src/app/api/inquiry/` - Inquiry API routes

**Example:**
```typescript
import { submitContactForm } from '@/utils/supabaseUtils';

await submitContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Need a quote'
});
```

---

### 3. Product System (Static Files)

```
User → /products → Static Data → Instant Render
                   ↓
              TypeScript Files
              No Database
              Fast Loading
```

**Files:**
- `src/data/products/solarPanels.ts` - Solar panel products
- `src/data/products/inverters.ts` - Inverter products
- `src/data/products/batteries.ts` - Battery products
- `src/data/products/accessories.ts` - Accessories & mounting
- `src/data/products/index.ts` - Main export & helpers

**Example:**
```typescript
import { allProducts, getProductById } from '@/data/products';

// Get all products (instant, no async needed)
const products = allProducts;

// Get specific product
const product = getProductById('sp-mono-550w');
```

---

## 📁 File Structure

```
/
├── sanity/                         # Sanity CMS (BLOG ONLY)
│   ├── schemas/
│   │   ├── post.ts                # Blog post schema
│   │   ├── category.ts            # Blog category
│   │   └── author.ts              # Blog author
│   └── lib/
│       ├── client.ts              # Sanity client
│       └── queries.ts             # Blog queries
│
├── src/
│   ├── app/
│   │   ├── blog/                  # Blog routes (Sanity)
│   │   ├── products/              # Product routes (Static)
│   │   ├── services/              # Service routes (Static)
│   │   └── api/
│   │       ├── contact/           # Contact API (Supabase)
│   │       └── inquiry/           # Inquiry APIs (Supabase)
│   │
│   ├── components/
│   │   ├── blog/                  # Blog components (Sanity)
│   │   ├── forms/                 # Form components (Supabase)
│   │   └── products/              # Product components (Static)
│   │
│   ├── data/                      # STATIC DATA
│   │   ├── products/              # All product data
│   │   │   ├── solarPanels.ts    # Solar panels
│   │   │   ├── inverters.ts      # Inverters
│   │   │   ├── batteries.ts      # Batteries
│   │   │   └── index.ts           # Main export
│   │   ├── services/              # All service data
│   │   └── projects/              # All project data
│   │
│   ├── lib/
│   │   ├── sanity.ts              # Sanity setup (BLOG ONLY)
│   │   └── supabase.ts            # Supabase setup (FORMS ONLY)
│   │
│   └── utils/
│       └── supabaseUtils.ts       # Form utilities (FORMS ONLY)
│
└── .env.local                     # Environment variables
```

---

## 🔧 Configuration

### Environment Variables

```bash
# Sanity (BLOG ONLY)
NEXT_PUBLIC_SANITY_PROJECT_ID=qepvii24
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...

# Supabase (FORMS ONLY)
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Email (For Form Notifications)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@autosyssunergy.com
```

---

## 🚀 Benefits of This Architecture

### 1. **Performance**
- ⚡ Static products load instantly (no database queries)
- 🚀 Better Core Web Vitals
- 📦 Smaller bundle size
- 🎯 Optimized for SEO

### 2. **Cost Efficiency**
- 💰 Reduced Supabase usage (only forms)
- 💰 Reduced Sanity operations (only blogs)
- 📉 Lower API costs
- 🔋 Less server load

### 3. **Reliability**
- 🔒 No external dependencies for products
- 💪 Works even if databases are down
- 🛡️ Static files are ultra-reliable
- ⚙️ Simpler to maintain

### 4. **Developer Experience**
- 📝 Easy to update (just edit files)
- 🐛 Easier to debug
- 🧪 Simpler testing
- 📖 Clear separation of concerns

### 5. **Security**
- 🔐 No exposed product database
- 🛡️ Form data properly secured in Supabase
- 🔒 Row Level Security for admin access
- ✅ Clean architecture

---

## 🎯 Use Cases

### Adding a New Blog Post
1. Go to `/studio`
2. Create new post in Sanity
3. Publish
✅ Automatically available on website

### Adding a New Product
1. Edit `/src/data/products/solarPanels.ts` (or relevant file)
2. Add product object
3. Commit changes
✅ Instantly available on website

### Viewing Form Submissions
1. Login to Supabase Dashboard
2. Go to Table Editor
3. View `contact_submissions`, `product_inquiries`, or `service_inquiries`
✅ Real-time data with filters and search

---

## 📊 Comparison Table

| Feature | Sanity | Supabase | Static Files |
|---------|--------|----------|--------------|
| **Used For** | Blogs | Forms | Products/Services |
| **Performance** | Good | Good | **Excellent** |
| **Cost** | Low | Low | **Free** |
| **Ease of Update** | UI | SQL/Dashboard | **Code** |
| **SEO** | Excellent | N/A | **Excellent** |
| **Real-time** | No | Yes | No |
| **Reliability** | High | High | **Highest** |

---

## 🔄 Data Flow Examples

### Example 1: User Visits Products Page

```
1. User navigates to /products
2. Next.js loads page component
3. Component imports from @/data/products
4. Static data returned instantly
5. Page renders immediately
6. ✅ Total time: <100ms
```

### Example 2: User Submits Contact Form

```
1. User fills contact form
2. Form submits to /api/contact
3. API route calls submitContactForm()
4. Data saved to Supabase
5. Email notification sent
6. User sees success message
7. ✅ Admin can view in Supabase Dashboard
```

### Example 3: User Reads Blog Post

```
1. User navigates to /blog/solar-guide
2. Next.js fetches from Sanity
3. Portable text rendered
4. Images optimized via urlFor
5. SEO metadata applied
6. ✅ Rich, SEO-optimized content
```

---

## 🛠️ Development Workflow

### To Update Products
```bash
# Edit the product file
code src/data/products/solarPanels.ts

# Products update immediately (no database sync needed)
```

### To Update Services
```bash
# Edit the service file
code src/data/services/residential.ts

# Services update immediately
```

### To Create Blog Post
1. Visit http://localhost:3000/studio
2. Create post in Sanity Studio
3. Publish

### To View Form Submissions
1. Visit Supabase Dashboard
2. Navigate to Table Editor
3. Select relevant table

---

## 📈 Monitoring & Analytics

### What to Monitor

**Sanity:**
- API usage (should be low, blog-only)
- Image optimization usage

**Supabase:**
- Form submission rate
- Database size (should grow slowly)
- Email delivery status

**Static Files:**
- Build size
- Load times (should be excellent)

---

## 🔮 Future Enhancements

### Potential Additions
1. **Product Search** - Client-side search with Fuse.js
2. **Blog Preview** - Preview unpublished blog posts
3. **Form Analytics** - Track form conversion rates
4. **Product Filters** - Advanced filtering and sorting

### What NOT to Do
- ❌ Don't move products back to database
- ❌ Don't use Supabase for static content
- ❌ Don't use Sanity for forms
- ❌ Keep the clear separation!

---

## 📞 Quick Reference

| Task | System | How |
|------|--------|-----|
| **Add blog post** | Sanity | `/studio` |
| **Update product** | Static Files | Edit `.ts` file |
| **View inquiries** | Supabase | Dashboard |
| **Update service** | Static Files | Edit `.ts` file |
| **Blog images** | Sanity | Upload in Studio |
| **Product images** | Static Files | Add to `/public/` |

---

## ✅ Summary

This architecture provides:
- ⚡ **Blazing fast** product/service pages
- 📝 **Rich blogging** capabilities
- 📊 **Organized lead** management
- 💰 **Cost-effective** operations
- 🛡️ **Secure and reliable** infrastructure

**Three systems, three purposes:**
1. **Sanity** = Blogs
2. **Supabase** = Forms
3. **Static Files** = Everything Else

---

**Last Updated:** November 12, 2025  
**Architecture Version:** 3.0 (Static-First)  
**Status:** ✅ Production Ready
