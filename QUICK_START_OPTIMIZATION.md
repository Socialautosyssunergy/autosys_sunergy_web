# Quick Start: Home Page Optimization Guide
## Autosys Sunergy - Priority Actions

---

## 🚀 Phase 1: Immediate Wins (Deploy Today)

### 1. Reduce Image Quality (5 minutes)

**File:** `src/components/ui/OptimizedImage.tsx`

```tsx
// Line 18: Change quality default
quality = 75, // Changed from 85
```

**Impact:** 15-20% image size reduction

---

### 2. Defer Analytics (5 minutes)

**File:** `src/app/layout.tsx`

```tsx
// Line 105: Change strategy
<Script
  strategy="lazyOnload"  // Changed from 'afterInteractive'
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
```

**Impact:** 200-300ms TTI improvement

---

### 3. Lazy Load Below-Fold Components (30 minutes)

**File:** `src/app/page.tsx`

Add at top:
```tsx
import dynamic from 'next/dynamic';

// Replace existing imports with:
const VideoReviewSection = dynamic(() => import('@/components/home/VideoReviewSection'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
});

const ContactForm = dynamic(() => import('@/components/contact/ContactForm'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
});
```

**Impact:** 300KB+ bundle reduction

---

### 4. Video Preload Settings (10 minutes)

**File:** `src/app/page.tsx`

```tsx
// Line 314: Hero video - add preload="metadata"
<OptimizedVideo
  src={MEDIA_CONFIG.hero.main}
  preload="metadata"  // Add this
  autoPlay={true}
  muted={true}
  loop={true}
/>

// All other videos: add preload="none"
<OptimizedVideo
  src={MEDIA_CONFIG.services.residential}
  preload="none"  // Add this
  autoPlay={false}  // Change to false
  muted={true}
  loop={true}
/>
```

**Impact:** Delays non-critical video loading

---

## 📦 Phase 2: Video Compression (2-4 hours)

### Compress All Videos

**Install FFmpeg:**
```bash
# Windows (using Chocolatey)
choco install ffmpeg

# Or download from: https://ffmpeg.org/download.html
```

**Compress Hero Video:**
```bash
cd public

# Create optimized version
ffmpeg -i Hero_section_video_1.mov ^
  -c:v libx264 -crf 28 -preset slow ^
  -c:a aac -b:a 128k ^
  -vf "scale=-2:1080" ^
  -movflags +faststart ^
  Hero_section_video_optimized.mp4
```

**Compress Service Videos:**
```bash
# For each service video
ffmpeg -i solar_services_video/residential_solar.mp4 ^
  -c:v libx264 -crf 30 -preset slow ^
  -c:a aac -b:a 96k ^
  -vf "scale=-2:720" ^
  -movflags +faststart ^
  solar_services_video/residential_solar_optimized.mp4
```

**Update mediaConfig.ts:**
```typescript
// src/data/mediaConfig.ts
hero: {
  main: '/Hero_section_video_optimized.mp4',  // Updated
  fallback: '/Hero_section_video_1.mov'
},
```

**Expected Results:**
- Hero video: 10MB → 2-3MB
- Service videos: 8MB → 1.5-2MB each
- Total savings: 40-50MB

---

## 🖼️ Phase 3: Image Optimization (1 hour)

### Add Responsive Sizes

**File:** `src/app/page.tsx`

Replace all `<OptimizedImage>` instances with proper sizes:

```tsx
// Hero/Large images
<OptimizedImage 
  src="..."
  alt="..."
  sizes="100vw"
  quality={75}
  priority={true}  // Only for hero
/>

// Service/Product cards (3 columns)
<OptimizedImage 
  src="..."
  alt="..."
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={70}
  loading="lazy"
/>

// Small thumbnails
<OptimizedImage 
  src="..."
  alt="..."
  sizes="(max-width: 768px) 50vw, 25vw"
  quality={65}
  loading="lazy"
/>
```

---

## 🎯 Testing After Each Phase

### Quick Performance Test

```bash
# Start dev server
npm run dev

# In another terminal - run Lighthouse
npx lighthouse http://localhost:3000 --view
```

### What to Check:

- ✅ Performance score > 80 after Phase 1
- ✅ Performance score > 90 after Phase 2
- ✅ LCP < 2.5s after Phase 3

### Chrome DevTools Network Tab:

1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Check:
   - Total transfer size < 10MB
   - Largest resources < 3MB
   - DOMContentLoaded < 3s

---

## 📊 Before/After Comparison

### Run This Command Before Changes:

```bash
# Save current state
npx lighthouse http://localhost:3000 --output=html --output-path=./before.html
```

### Run After Each Phase:

```bash
# Phase 1
npx lighthouse http://localhost:3000 --output=html --output-path=./phase1.html

# Phase 2
npx lighthouse http://localhost:3000 --output=html --output-path=./phase2.html

# Phase 3
npx lighthouse http://localhost:3000 --output=html --output-path=./phase3.html
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Videos Not Loading

**Solution:**
```tsx
// Ensure fallback is working
<OptimizedVideo
  src={MEDIA_CONFIG.hero.main}
  fallbackSrc="/Hero_section_video_1.mov"  // Add fallback
  poster="/hero-poster.jpg"
/>
```

### Issue 2: Images Blurry

**Solution:**
```tsx
// Increase quality for critical images
<OptimizedImage 
  src="..."
  quality={80}  // Increase from 75
  priority={true}
/>
```

### Issue 3: Layout Shift

**Solution:**
```tsx
// Add explicit dimensions
<OptimizedImage 
  src="..."
  width={800}
  height={600}
  sizes="..."
/>
```

### Issue 4: Dynamic Import Not Working

**Solution:**
```tsx
// Check that component is default export
// src/components/home/VideoReviewSection.tsx
export default function VideoReviewSection() {
  // ...
}
```

---

## 📈 Expected Results Summary

| Phase | Time | Performance Gain | Lighthouse Score |
|-------|------|------------------|------------------|
| Phase 1 | 1 hour | +25-30% | 75-80 |
| Phase 2 | 4 hours | +20-25% | 85-90 |
| Phase 3 | 1 hour | +10-15% | 90-95 |
| **Total** | **6 hours** | **+55-70%** | **90-95** |

---

## 🔍 Verification Checklist

After completing all phases, verify:

- [ ] All images load correctly
- [ ] All videos play properly
- [ ] No console errors
- [ ] Page loads in < 3s on fast 3G
- [ ] Lighthouse score > 90
- [ ] No layout shifts
- [ ] Mobile experience is smooth
- [ ] Contact form works
- [ ] Analytics still tracking

---

## 🎯 Next Steps (Advanced)

Once basic optimizations are complete:

1. **Server Components Migration** (Week 2)
   - See: HOME_PAGE_OPTIMIZATION_PLAN.md - Part 1

2. **Caching Strategy** (Week 2)
   - See: HOME_PAGE_OPTIMIZATION_PLAN.md - Part 4.2

3. **Animation Optimization** (Week 3)
   - See: HOME_PAGE_OPTIMIZATION_PLAN.md - Part 5.2

---

## 📚 Quick Reference Links

- [Full Optimization Plan](./HOME_PAGE_OPTIMIZATION_PLAN.md)
- [Next.js Image Docs](https://nextjs.org/docs/app/api-reference/components/image)
- [Lighthouse Scoring](https://web.dev/performance-scoring/)
- [FFmpeg Video Compression Guide](https://trac.ffmpeg.org/wiki/Encode/H.264)

---

**Quick Start Version:** 1.0  
**Last Updated:** October 16, 2025  
**Estimated Total Time:** 6 hours  
**Expected Improvement:** 55-70% performance boost
