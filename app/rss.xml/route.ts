import { getAllSanityPosts } from '@/lib/sanity';

export async function GET() {
	const posts = await getAllSanityPosts();
	const siteUrl = 'https://ronisarkar.spechype.com';

	const rssItems = posts
		.map((post) => {
			const postUrl = `${siteUrl}/blog/${post.slug}`;
			const pubDate = new Date(post.publishedAt).toUTCString();

			return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.categories?.map((cat) => `<category>${cat.title}</category>`).join('\n      ') || ''}
      ${post.author?.name ? `<author>${post.author.name}</author>` : ''}
    </item>`;
		})
		.join('');

	const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Roni Sarkar - Blog</title>
    <link>${siteUrl}</link>
    <description>Thoughts, tutorials, and insights about web development and technology.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

	return new Response(rssFeed, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
		},
	});
}
