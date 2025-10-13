import { NextRequest, NextResponse } from 'next/server';
import { getContactSubmissions, updateContactSubmissionStatus } from '@/utils/supabaseUtils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'pending' | 'in_progress' | 'resolved' | null;
    
    const submissions = await getContactSubmissions(status || undefined);
    
    return NextResponse.json({ submissions });
    
  } catch (error) {
    console.error('Admin contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }
    
    if (!['pending', 'in_progress', 'resolved'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    const updatedSubmission = await updateContactSubmissionStatus(id, status);
    
    return NextResponse.json({ 
      message: 'Status updated successfully',
      submission: updatedSubmission
    });
    
  } catch (error) {
    console.error('Admin contact update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
