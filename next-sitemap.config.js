const siteUrl =
	process.env.NEXT_PUBLIC_BASE_URL || 'https://roni-sarkar.vercel.app';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl,
	generateRobotsTxt: false,
	changefreq: 'weekly',
	priority: 0.7,
	sitemapSize: 5000,
	exclude: ['/studio', '/studio/*', '/api/*'],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/studio', '/api'],
			},
		],
		additionalSitemaps: [`${siteUrl}/sitemap.xml`],
	},
};
