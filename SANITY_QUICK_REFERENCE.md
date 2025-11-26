# 🚀 Quick Reference: Sanity vs Supabase

## Content Management Decision Tree

```
Need to manage content?
│
├─ 📝 Is it a BLOG POST?
│  └─ YES → Use SANITY
│     • Create in Sanity Studio (/studio)
│     • Rich text editor
│     • Media management
│     • SEO metadata
│
└─ 📦 Is it PRODUCT/SERVICE/BUSINESS DATA?
   └─ YES → Use SUPABASE
      • Manage in Supabase Dashboard
      • Structured data
      • API/Database operations
      • Real-time capabilities
```

---

## ⚡ Quick Code Examples

### ✅ Fetching Blog Posts (Sanity)
```typescript
import { client } from '@/lib/sanity';

// In a Server Component or API route
const posts = await client.fetch(`
  *[_type == "post"] | order(publishDate desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishDate
  }
`);
```

### ✅ Fetching Products (Supabase)
```typescript
import { getProducts } from '@/lib/supabase/products';

// In a Server Component or API route
const { data: products, count } = await getProducts({
  category: 'solar-panels',
  featured: true,
  limit: 10
});
```

---

## 📍 Where to Go for Each Task

| Task | System | URL/Path |
|------|--------|----------|
| **Create blog post** | Sanity | `/studio` |
| **Edit blog post** | Sanity | `/studio` |
| **Manage blog categories** | Sanity | `/studio` |
| **Add blog author** | Sanity | `/studio` |
| **Add product** | Supabase | Supabase Dashboard |
| **Update product** | Supabase | Supabase Dashboard |
| **View contact forms** | Supabase | Supabase Dashboard |
| **User management** | Supabase | Supabase Dashboard |

---

## 🔑 Key Environment Variables

```bash
# Sanity (Blog Only)
NEXT_PUBLIC_SANITY_PROJECT_ID=qepvii24
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...

# Supabase (Everything Else)
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

---

## 🚫 Don't Do This

### ❌ Don't use Sanity for products
```typescript
// WRONG - Products are not in Sanity
const products = await client.fetch(`*[_type == "product"]`);
```

### ❌ Don't use Supabase for blog posts
```typescript
// WRONG - Blog posts are not in Supabase
const posts = await supabase.from('blog_posts').select('*');
```

---

## 📊 Data Flow Diagram

```
User Request
    |
    ├─ Blog Route (/blog/*)
    |  └─ Sanity Client
    |     └─ Sanity Cloud (Blog Content)
    |        └─ Return Blog Data
    |
    └─ Product Route (/products/*)
       └─ Supabase Client
          └─ Supabase PostgreSQL (Product Data)
             └─ Return Product Data
```

---

## 🛠️ Troubleshooting

### Blog not loading?
1. Check Sanity credentials in `.env.local`
2. Verify Sanity Studio is accessible at `/studio`
3. Check console for Sanity API errors

### Products not loading?
1. Check Supabase credentials in `.env.local`
2. Verify Supabase dashboard is accessible
3. Check console for Supabase API errors

### Both not loading?
1. Check network connection
2. Verify environment variables are set
3. Check browser console for errors

---

## 📚 Full Documentation

- **Architecture Guide**: `SANITY_ARCHITECTURE.md`
- **Migration Summary**: `SANITY_MIGRATION_SUMMARY.md`
- **This Reference**: `SANITY_QUICK_REFERENCE.md`

---

**Remember:** 
- **Sanity** = Blog Content 📝
- **Supabase** = Everything Else 📦
