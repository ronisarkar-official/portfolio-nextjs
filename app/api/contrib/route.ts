// app/api/contrib/route.ts
import { NextRequest } from 'next/server';
import sanitizeHtml from 'sanitize-html';

export async function GET(req: NextRequest) {
	try {
		const url = new URL(req.url);
		const username = url.searchParams.get('username') || '';
		if (!username) return new Response('Missing username', { status: 400 });

		const ghUrl = `https://github.com/users/${encodeURIComponent(username)}/contributions`;
		const r = await fetch(ghUrl);
		if (!r.ok) return new Response('Failed fetching GitHub', { status: 502 });

		let svg = await r.text();

		const clean = sanitizeHtml(svg, {
			allowedTags: [
				'svg',
				'g',
				'rect',
				'path',
				'text',
				'title',
				'line',
				'defs',
				'linearGradient',
				'stop',
				'circle',
			],
			allowedAttributes: {
				'*': [
					'class',
					'width',
					'height',
					'viewbox',
					'viewBox',
					'fill',
					'x',
					'y',
					'rx',
					'ry',
					'cx',
					'cy',
					'r',
					'd',
					'transform',
					'stroke',
					'stroke-width',
					'style',
					'xmlns',
					'aria-hidden',
				],
			},
			parser: {
				lowerCaseTags: false,
			},
		});

		return new Response(clean, {
			headers: {
				'Content-Type': 'image/svg+xml; charset=utf-8',
				'Cache-Control': 's-maxage=3600, stale-while-revalidate=60',
			},
		});
	} catch (err) {
		return new Response('Server error', { status: 500 });
	}
}
