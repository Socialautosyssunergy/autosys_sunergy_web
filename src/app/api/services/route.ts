import { NextRequest, NextResponse } from 'next/server';
import { allServices, getServicesByCategory } from '@/data/services';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let services;
    
    if (category) {
      services = getServicesByCategory(category);
    } else {
      services = allServices;
    }
    
    return NextResponse.json({ services });
    
  } catch (error) {
    console.error('Services API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
