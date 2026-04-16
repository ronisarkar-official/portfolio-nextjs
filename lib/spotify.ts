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

// Last.fm configuration
const lastfm_api_key = process.env.LASTFM_API_KEY;
const lastfm_username = process.env.LASTFM_USERNAME;

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
				const item = data.items[0];
				const track = item.track;
				const playedAt = new Date(item.played_at);
				const now = new Date();
				const hoursSincePlay =
					(now.getTime() - playedAt.getTime()) / (1000 * 60 * 60);

				// Only show recently played if it was within the last 24 hours
				if (hoursSincePlay > 24) {
					console.log(
						`[Spotify] Song "${track.name}" was played ${hoursSincePlay.toFixed(1)} hours ago (too old, skipping)`,
					);
					return null;
				}

				console.log(
					`[Spotify] Recently played "${track.name}" from ${hoursSincePlay.toFixed(1)} hours ago`,
				);

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
		console.error('[Spotify] Error fetching recently played:', error);
	}

	return null;
}

async function getLastFmData(): Promise<SpotifyData | null> {
	if (!lastfm_api_key || !lastfm_username) {
		console.log('[Last.fm] API key or username not configured');
		return null;
	}

	try {
		const response = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastfm_username}&api_key=${lastfm_api_key}&format=json&limit=1`,
			{ cache: 'no-store' },
		);

		if (response.ok) {
			const data = await response.json();
			const tracks = data.recenttracks?.track;
			if (tracks && tracks.length > 0) {
				const track = tracks[0];
				const isPlaying = track['@attr']?.nowplaying === 'true';

				// Get album image from Last.fm if available
				let albumImageUrl: string | undefined;
				if (track.image && track.image.length > 0) {
					// Use the largest image available
					const images = track.image.filter((img: any) => img['#text']);
					if (images.length > 0) {
						albumImageUrl = images[images.length - 1]['#text'];
					}
				}

				console.log(
					`[Last.fm] ${isPlaying ? 'Now playing' : 'Last played'}: "${track.name}" by ${track.artist['#text']}`,
				);

				return {
					isPlaying,
					title: track.name,
					artist: track.artist['#text'],
					album: track.album['#text'] || undefined,
					albumImageUrl,
					songUrl: `https://www.last.fm/music/${encodeURIComponent(track.artist['#text'])}/_/${encodeURIComponent(track.name)}`,
				};
			}
		}
	} catch (error) {
		console.error('[Last.fm] Error fetching data:', error);
	}

	return null;
}

/**
 * Default state to show when no music is available
 */
const DEFAULT_STATE: SpotifyData = {
	isPlaying: false,
	title: 'No song playing',
	artist: 'Connect your Spotify',
	album: undefined,
	albumImageUrl: undefined,
	songUrl: undefined,
};

/**
 * Fetches current music playing data without caching.
 * Tries Last.fm first for real-time data, then falls back to Spotify.
 * Use this for real-time updates (API routes, client polling).
 */
export async function getSpotifyData(): Promise<SpotifyData> {
	// Try Last.fm first for real-time data
	const lastFmData = await getLastFmData();
	if (lastFmData) {
		console.log('[Last.fm] Using Last.fm data');
		return lastFmData;
	}

	// Fall back to Spotify if Last.fm not available
	if (!client_id || !client_secret || !refresh_token) {
		console.log('[Spotify] Credentials not configured, and Last.fm failed');
		return DEFAULT_STATE;
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
				return recentlyPlayed;
			}
			console.log('[Spotify] No recently played tracks found');
			return DEFAULT_STATE;
		}

		const song = await response.json();

		// If no current item, fall back to recently played
		if (!song.item) {
			const recentlyPlayed = await getRecentlyPlayed(access_token);
			if (recentlyPlayed) {
				console.log(
					'[Spotify] Recently played (no item):',
					recentlyPlayed.title,
				);
				return recentlyPlayed;
			}
			console.log('[Spotify] No item in current playing');
			return DEFAULT_STATE;
		}

		const result = {
			isPlaying: song.is_playing,
			title: song.item.name,
			artist: song.item.artists.map((artist: any) => artist.name).join(', '),
			album: song.item.album.name,
			albumImageUrl: song.item.album.images[0]?.url,
			songUrl: song.item.external_urls.spotify,
		};

		console.log(
			'[Spotify] Current track:',
			result.title,
			'| Playing:',
			result.isPlaying,
		);
		return result;
	} catch (error) {
		console.error('[Spotify] Error fetching data:', error);
		return DEFAULT_STATE;
	}
}

/**
 * Get Spotify data with caching for server components.
 * Cached for 10 seconds to balance freshness with API rate limits.
 * Use this ONLY for initial server-side rendering.
 */
export const getSpotifyDataCached = unstable_cache(
	async () => getSpotifyData(),
	['spotify-now-playing'],
	{
		revalidate: 10, // Cache for 10 seconds
		tags: ['spotify'],
	},
);
