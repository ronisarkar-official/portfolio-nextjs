import { NextRequest, NextResponse } from 'next/server';
import { client, writeClient } from '@/sanity/lib/client';

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const VISITOR_COUNT_QUERY = `*[_type == "visitorCount"][0]`;

export async function GET() {
  try {
    const visitorDoc = await client.fetch(
      VISITOR_COUNT_QUERY, 
      {}, 
      { 
        cache: 'no-store',
        next: { revalidate: 0 } 
      }
    );
    
    return NextResponse.json({
      count: visitorDoc?.count || 0,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visitor count', count: 0 },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the current visitor count document
    const visitorDoc = await client.fetch(
      VISITOR_COUNT_QUERY,
      {},
      { cache: 'no-store' }
    );
    
    let newCount: number;

    if (!visitorDoc) {
      // Create the document if it doesn't exist
      const created = await writeClient.create({
        _type: 'visitorCount',
        count: 1,
      });
      newCount = created.count;
    } else {
      // Increment the existing count
      const currentCount = visitorDoc.count || 0;
      const updated = await writeClient
        .patch(visitorDoc._id)
        .set({ count: currentCount + 1 })
        .commit();
      newCount = updated.count;
    }

    return NextResponse.json({
      success: true,
      count: newCount,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return NextResponse.json(
      { error: 'Failed to increment visitor count', count: 0 },
      { status: 500 }
    );
  }
}
