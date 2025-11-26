import post from './post'
import category from './category'
import author from './author'

// Sanity is now used ONLY for blog/SEO content management
// Products are managed exclusively through Supabase
export const schemaTypes = [
  // Blog schemas only
  post, 
  category, 
  author
]

// Export individual schemas for flexibility
export { 
  post, 
  category, 
  author
}
