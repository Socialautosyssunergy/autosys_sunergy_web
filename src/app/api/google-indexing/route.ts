import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

interface ServiceAccount {
  client_email: string;
  private_key: string;
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const { url, action = 'URL_UPDATED' } = await request.json() as {
      url: string;
      action?: string;
    };
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Google Indexing API endpoint
    const indexingApiUrl = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
    
    // Check if Google Service Account is configured
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (!serviceAccountKey) {
      console.warn('Google Indexing API not configured - skipping indexing notification');
      return NextResponse.json({ 
        message: 'Indexing API not configured', 
        warning: 'Set up GOOGLE_SERVICE_ACCOUNT_KEY environment variable for automatic indexing'
      }, { status: 200 });
    }

    // Get access token using Google Auth library
    const serviceAccount = JSON.parse(serviceAccountKey) as ServiceAccount;
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/indexing']
    });
    
    const accessToken = await auth.getAccessToken();

    const response = await fetch(indexingApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        url: url,
        type: action, // 'URL_UPDATED' or 'URL_DELETED'
      }),
    });

    if (response.ok) {
      const result = await response.json() as Record<string, unknown>;
      console.log('Successfully notified Google about URL:', url);
      return NextResponse.json({ 
        success: true, 
        message: 'Google notified successfully',
        result 
      });
    } else {
      const error = await response.text();
      console.error('Failed to notify Google:', error);
      return NextResponse.json({ 
        error: 'Failed to notify Google', 
        details: error 
      }, { status: response.status });
    }

  } catch (error) {
    console.error('Error in Google indexing notification:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: 'Failed to process indexing request'
    }, { status: 500 });
  }
}
