import post from './post'
import category from './category'
import author from './author'
import product from './product'
import productCategory from './productCategory'
import productBrand from './productBrand'
import productReview from './productReview'

export const schemaTypes = [
  // Blog schemas
  post, 
  category, 
  author,
  
  // Product schemas
  product,
  productCategory,
  productBrand,
  productReview
]

// Export individual schemas for flexibility
export { 
  post, 
  category, 
  author,
  product,
  productCategory,
  productBrand,
  productReview
}
