import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/utils/supabaseUtils';

export async function GET() {
  try {
    const posts = await getBlogPosts(true);
    
    return NextResponse.json({ posts });
    
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
