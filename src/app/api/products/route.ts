import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getProductsByCategory, searchProducts } from '@/data/products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const query = searchParams.get('q');
    
    let products;
    
    if (query) {
      products = searchProducts(query);
    } else if (category) {
      products = getProductsByCategory(category);
    } else {
      products = await getAllProducts();
    }
    
    return NextResponse.json({ products });
    
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
