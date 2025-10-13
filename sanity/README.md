# Sanity CMS Directory

This directory contains all Sanity-related configuration and files for the AutoSys Sunergy Blog CMS.

## Directory Structure

```
sanity/
├── schemas/           # Schema definitions
│   ├── index.ts      # Schema exports
│   ├── post.ts       # Blog post schema
│   └── category.ts   # Category schema
├── lib/              # Utilities and helpers
│   ├── client.ts     # Sanity client configuration
│   ├── queries.ts    # GROQ queries
│   ├── types.ts      # TypeScript types
│   └── utils.ts      # Helper functions
├── plugins/          # Custom Sanity plugins (future use)
└── sanity.config.ts  # Main Sanity configuration
```

## Schemas

### Post Schema (Enhanced with Auto-Fill Features)
- **Title**: Blog post title (required, max 100 chars)
- **Slug**: URL-friendly slug (🤖 **AUTO-GENERATED** from title)
- **Excerpt**: Short description (required, max 200 chars)
- **Cover Image**: Featured image with alt text (required)
- **Content**: Rich text content with code blocks, images, links
- **Author**: Simple text field (defaults to "AutoSys Sunergy Team")
- **Category**: Reference to category document (required)
- **Tags**: Array of string tags (🤖 **AUTO-GENERATED** from content using AI)
- **Featured**: Boolean for featured posts
- **Publish Date**: Publication date (🤖 **AUTO-GENERATED** and hidden)
- **Last Modified**: Last update timestamp (🤖 **AUTO-GENERATED** and hidden)
- **SEO Title**: Meta title (🤖 **AUTO-FILLED** from blog title)
- **Meta Description**: SEO description (🤖 **AUTO-FILLED** from excerpt)
- **Related Posts**: Up to 3 related posts

### Category Schema
- **Name**: Category name (required)
- **Slug**: URL-friendly slug (auto-generated)
- **Description**: Category description
- **Color**: Predefined color for UI display

## 🤖 Auto-Fill Features

### 1. **Auto-Generated Slugs**
- Automatically created from the blog title
- URL-friendly format with proper sanitization
- Updates when title changes

### 2. **AI-Powered Tag Generation**
- **25+ Solar Energy Categories**: Covers all aspects of solar technology
- **10+ Content Types**: Technical guides, reviews, news, tips, etc.
- **Smart Analysis**: Reads your content and suggests relevant tags
- **No External Dependencies**: Pure JavaScript implementation
- **Limit**: Maximum 8 tags for optimal UX

**Sample Generated Tags:**
- Solar Panel, Solar Installation, Solar Inverter
- Technical Guide, Installation Guide, Product Review
- Renewable Energy, Grid Connection, Solar Financing

### 3. **Hidden System Fields**
- **Publish Date**: Auto-set to current date/time
- **Last Modified**: Auto-updated on changes
- **Both fields are hidden** in a separate "System" group

### 4. **Auto-Filled SEO Fields**
- **SEO Title**: Auto-filled from blog title + "| AutoSys Sunergy"
- **Meta Description**: Auto-filled from excerpt + company mention
- **Both respect character limits** (60 and 160 chars respectively)

## 📋 Content Creation Workflow

1. **Write Title** → Slug auto-generates
2. **Add Content** → Tags auto-generate from your text
3. **Write Excerpt** → Meta description auto-fills
4. **Choose Category** → Manual selection
5. **Upload Cover Image** → Manual upload
6. **Publish** → Dates auto-set

## 🎯 Organized Studio Layout

### Content Tab (Primary)
- Title, Excerpt, Cover Image, Content, Author, Category

### SEO & Metadata Tab
- Auto-generated tags (editable)
- Auto-filled SEO title (editable)
- Auto-filled meta description (editable)

### Settings Tab
- Featured post toggle
- Related posts selection

### System Tab (Hidden)
- Auto-generated slug
- Auto-set publish date
- Auto-updated last modified date

## Usage

### In Components
```typescript
import { client, urlFor } from '@/sanity/lib/client';
import { blogPostsQuery } from '@/sanity/lib/queries';
import { BlogPost } from '@/sanity/lib/types';

// Fetch blog posts
const posts = await client.fetch<BlogPost[]>(blogPostsQuery);

// Generate image URLs
const imageUrl = urlFor(post.coverImage).width(800).height(400).url();

// Author is now a simple string
const authorName = post.author; // "AutoSys Sunergy Team"
```

### Studio Access
The Sanity Studio is accessible at `/studio` in your Next.js app.

## Environment Variables Required

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=qepvii24
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

## Migration to Separate Project

This structure is designed to be easily extractable into a separate Sanity project:

1. Copy the entire `sanity/` directory
2. Create a new Sanity project: `npx create-sanity@latest`
3. Replace the generated files with these organized files
4. Update import paths as needed
5. Deploy the studio separately

## Features

- **Organized Structure**: Clean separation of concerns
- **TypeScript Support**: Full type safety
- **Custom Studio Layout**: Organized navigation
- **Code Input Support**: Syntax highlighting for code blocks
- **Image Optimization**: Built-in image URL generation
- **SEO Ready**: Meta fields and structured data
- **Preview Mode**: Draft content preview support
