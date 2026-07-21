const siteUrl =
	process.env.NEXT_PUBLIC_BASE_URL || 'https://roni-sarkar.vercel.app';

const robotsTxt = `# Allow search indexing, block AI training crawlers
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

# Allow AI search/answering crawlers (NOT training crawlers)
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Allow all other crawlers (including Googlebot for search)
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
