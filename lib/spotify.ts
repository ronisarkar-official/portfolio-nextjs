import { unstable_cache } from 'next/cache';

export interface SpotifyData {
	isPlaying: boolean;
	title?: string;
	artist?: string;
	album?: string;
	albumImageUrl?: string;
	songUrl?: string;
}

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT =
	'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT =
	'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refresh_token!,
		}),
		cache: 'no-store',
	});

	return response.json();
}

async function getRecentlyPlayed(
	access_token: string,
): Promise<SpotifyData | null> {
	try {
		const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: 'no-store',
		});

		if (response.ok) {
			const data = await response.json();
			if (data.items && data.items.length > 0) {
				const track = data.items[0].track;
				return {
					isPlaying: false,
					title: track.name,
					artist: track.artists.map((artist: any) => artist.name).join(', '),
					album: track.album.name,
					albumImageUrl: track.album.images[0]?.url,
					songUrl: track.external_urls.spotify,
				};
			}
		}
	} catch (error) {
		console.error('Error fetching recently played:', error);
	}

	return null;
}

/**
 * Fetches current Spotify playing data without caching.
 * Use this for real-time updates (API routes, client polling).
 */
export async function getSpotifyData(): Promise<SpotifyData> {
	// Return empty state if credentials not configured
	if (!client_id || !client_secret || !refresh_token) {
		return { isPlaying: false };
	}

	try {
		const { access_token } = await getAccessToken();

		// Try to get currently playing
		const response = await fetch(NOW_PLAYING_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: 'no-store',
		});

		// If nothing playing or error, fall back to recently played
		if (response.status === 204 || response.status > 400) {
			const recentlyPlayed = await getRecentlyPlayed(access_token);
			if (recentlyPlayed) {
				console.log('[Spotify] Recently played:', recentlyPlayed.title);
			}
			return recentlyPlayed ?? { isPlaying: false };
		}

		const song = await response.json();

		// If no current item, fall back to recently played
		if (!song.item) {
			const recentlyPlayed = await getRecentlyPlayed(access_token);
			if (recentlyPlayed) {
				console.log('[Spotify] Recently played (no item):', recentlyPlayed.title);
			}
			return recentlyPlayed ?? { isPlaying: false };
		}

		const result = {
			isPlaying: song.is_playing,
			title: song.item.name,
			artist: song.item.artists.map((artist: any) => artist.name).join(', '),
			album: song.item.album.name,
			albumImageUrl: song.item.album.images[0]?.url,
			songUrl: song.item.external_urls.spotify,
		};
		
		console.log('[Spotify] Current track:', result.title, '| Playing:', result.isPlaying);
		return result;
	} catch (error) {
		console.error('Error fetching Spotify data:', error);
		return { isPlaying: false };
	}
}

/**
 * Get Spotify data with caching for server components.
 * Cached for 30 seconds to balance freshness with API rate limits.
 * Use this ONLY for initial server-side rendering.
 */
export const getSpotifyDataCached = unstable_cache(
	async () => getSpotifyData(),
	['spotify-now-playing'],
	{
		revalidate: 30, // Cache for 30 seconds
		tags: ['spotify'],
	},
);
