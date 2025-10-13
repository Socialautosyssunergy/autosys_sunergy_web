import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook signature (recommended for production)
    const signature = request.headers.get('sanity-webhook-signature');
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
    
    if (webhookSecret && signature) {
      // Implement signature verification here
      // const crypto = require('crypto');
      // const body = await request.text();
      // const expectedSignature = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');
      // if (signature !== expectedSignature) {
      //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      // }
    }

    const body = await request.json();
    console.log('Received Sanity webhook:', body);

    // Extract document information
    const { _type, slug } = body;

    if (_type === 'post' && slug?.current) {
      const postUrl = `https://autosynsunergy.com/blog/${slug.current}`;
      const action = body._deleted ? 'URL_DELETED' : 'URL_UPDATED';

      console.log(`Processing ${action} for blog post:`, postUrl);

      // Revalidate the specific blog post page
      revalidatePath(`/blog/${slug.current}`);
      
      // Revalidate the blog listing page
      revalidatePath('/blog');
      
      // Revalidate sitemap
      revalidatePath('/sitemap.xml');
      
      // Revalidate by tags for more granular control
      revalidateTag('blog-posts');
      revalidateTag(`blog-post-${slug.current}`);

      // Notify Google about the change
      try {
        const indexingResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://autosynsunergy.com'}/api/google-indexing`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: postUrl,
            action: action,
          }),
        });

        const indexingResult = await indexingResponse.json();
        console.log('Google indexing notification result:', indexingResult);
      } catch (indexingError) {
        console.error('Failed to notify Google about URL change:', indexingError);
      }

      // Submit updated sitemap to search engines
      await submitSitemapToSearchEngines();

      return NextResponse.json({
        success: true,
        message: `Successfully processed ${action} for ${postUrl}`,
        revalidated: [
          `/blog/${slug.current}`,
          '/blog',
          '/sitemap.xml'
        ]
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook received but no action needed',
    });

  } catch (error) {
    console.error('Error processing Sanity webhook:', error);
    return NextResponse.json({
      error: 'Failed to process webhook',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Function to submit sitemap to search engines
async function submitSitemapToSearchEngines() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autosynsunergy.com';
  const sitemapUrl = `${siteUrl}/sitemap.xml`;

  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  ];

  const submissions = searchEngines.map(async (url) => {
    try {
      const response = await fetch(url, { method: 'GET' });
      console.log(`Sitemap submitted to ${url}:`, response.status);
      return { url, success: response.ok, status: response.status };
    } catch (error) {
      console.error(`Failed to submit sitemap to ${url}:`, error);
      return { url, success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  });

  const results = await Promise.allSettled(submissions);
  return results;
}
