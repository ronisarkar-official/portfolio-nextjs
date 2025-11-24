import { NextResponse } from 'next/server';
import { getSpotifyData } from '@/lib/spotify';

// Force dynamic rendering - never cache this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * API route for client-side polling of Spotify data.
 * Completely uncached to ensure real-time updates.
 */
export async function GET() {
	const data = await getSpotifyData();
	
	return NextResponse.json(data, {
		headers: {
			'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
			'CDN-Cache-Control': 'no-store',
			'Vercel-CDN-Cache-Control': 'no-store',
		},
	});
}
