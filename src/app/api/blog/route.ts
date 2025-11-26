import { NextResponse } from 'next/server';
import { client, blogPostsQuery } from '@/lib/sanity';

export async function GET() {
  try {
    const posts = await client.fetch(blogPostsQuery);
    
    return NextResponse.json({ posts });
    
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
