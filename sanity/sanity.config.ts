import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {codeInput} from '@sanity/code-input'
import {autoFillPlugin} from './plugins/autoFill'

// Import all schemas from index
import {schemaTypes} from './schemas'

/**
 * Sanity CMS Configuration - BLOG/SEO ONLY
 * 
 * ⚠️ IMPORTANT: Sanity is now used EXCLUSIVELY for blog content management
 * 
 * Content Management:
 * - ✅ Blog Posts (via Sanity) - For SEO and content marketing
 * - ✅ Blog Categories (via Sanity)
 * - ✅ Blog Authors (via Sanity)
 * - ❌ Products (via Supabase) - All product data managed in Supabase
 * - ❌ Services (via Supabase) - All service data managed in Supabase
 * - ❌ Projects (via Supabase) - All project data managed in Supabase
 */
export default defineConfig({
  name: 'default',
  title: 'AutoSys Sunergy CMS - Blog Management',

  projectId: 'qepvii24',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Blog Section (ONLY content type in Sanity)
            S.listItem()
              .title('📝 Blog Posts')
              .schemaType('post')
              .child(S.documentTypeList('post')),
            S.listItem()
              .title('📁 Blog Categories')
              .schemaType('category')
              .child(S.documentTypeList('category')),
            S.listItem()
              .title('✍️ Blog Authors')
              .schemaType('author')
              .child(S.documentTypeList('author')),
          ])
    }),
    codeInput(),
    autoFillPlugin(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
})
