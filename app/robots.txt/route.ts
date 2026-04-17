const siteUrl =
	process.env.NEXT_PUBLIC_BASE_URL || 'https://ronisarkar.spechype.com';

const robotsTxt = `# *
User-agent: *
Allow: /
Disallow: /studio
Disallow: /api

# Host
Host: ${siteUrl}

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml
`;

export async function GET() {
	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain',
		},
	});
}
