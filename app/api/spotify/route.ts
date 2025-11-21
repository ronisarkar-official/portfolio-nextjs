import { NextResponse } from 'next/server';
import { getSpotifyData } from '@/lib/spotify';

/**
 * API route for client-side polling of Spotify data.
 * Uses shared Spotify logic from lib/spotify.ts with caching.
 */
export async function GET() {
	const data = await getSpotifyData();
	return NextResponse.json(data);
}
