import { NextRequest, NextResponse } from 'next/server';
import { client, writeClient } from '@/sanity/lib/client';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get the current post
    const query = `*[_type == "post" && slug.current == $slug][0]`;
    const post = await client.fetch(query, { slug });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment the view count
    const currentViews = post.views || 0;
    const updatedPost = await writeClient
      .patch(post._id)
      .set({ views: currentViews + 1 })
      .commit();

    return NextResponse.json({
      success: true,
      views: updatedPost.views,
    });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get the current post's view count
    const query = `*[_type == "post" && slug.current == $slug][0].views`;
    const views = await client.fetch(query, { slug });

    return NextResponse.json({
      views: views || 0,
    });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json(
      { error: 'Failed to fetch views' },
      { status: 500 }
    );
  }
}
