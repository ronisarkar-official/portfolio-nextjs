import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'https://ronisarkar.spechype.com';

	// Fetch all blog post slugs from Sanity
	const blogSlugs = await getAllPostSlugs();

	// Static routes
	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1.0,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/projects`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
	];

	// Dynamic blog post routes
	const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
		url: `${baseUrl}/blog/${slug}`,
		lastModified: new Date(),
		changeFrequency: 'weekly' as const,
		priority: 0.7,
	}));

	return [...staticRoutes, ...blogRoutes];
}
