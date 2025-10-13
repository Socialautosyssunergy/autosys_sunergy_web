import { NextRequest, NextResponse } from 'next/server';

// Dynamic import to avoid build-time issues
const getProductsFunction = async (category?: string) => {
  try {
    const { getProducts } = await import('@/utils/supabaseUtils');
    return await getProducts(category);
  } catch (error) {
    console.error('Error loading products function:', error);
    return [];
  }
};

const searchProductsFunction = async (query: string) => {
  try {
    const { searchProducts } = await import('@/utils/supabaseUtils');
    return await searchProducts(query);
  } catch (error) {
    console.error('Error loading search function:', error);
    return [];
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const query = searchParams.get('q');
    
    let products;
    
    if (query) {
      products = await searchProductsFunction(query);
    } else {
      products = await getProductsFunction(category || undefined);
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
