/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://ronisarkar.spechype.com',
	generateRobotsTxt: true,
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
		additionalSitemaps: ['https://ronisarkar.spechype.com/sitemap.xml'],
	},
};
