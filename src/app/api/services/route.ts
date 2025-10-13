import { NextRequest, NextResponse } from 'next/server';

// Dynamic import to avoid build-time issues
const getServicesFunction = async (category?: string) => {
  try {
    const { getServices } = await import('@/utils/supabaseUtils');
    return await getServices(category);
  } catch (error) {
    console.error('Error loading services function:', error);
    return [];
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const services = await getServicesFunction(category || undefined);
    
    return NextResponse.json({ services });
    
  } catch (error) {
    console.error('Services API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
