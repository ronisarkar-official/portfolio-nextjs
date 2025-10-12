import { getAllPosts } from '@/lib/markdown';
import Link from 'next/link';

// Revalidate every 60 seconds to get fresh posts
export const revalidate = 60;

export default async function BlogPage() {
	const posts = await getAllPosts();

	return (
		<article className="mt-8 flex flex-col gap-8 pb-16">
			<h1 className="title">My Blogs</h1>

			<div className="grid gap-4 md:grid-cols-2">
				{posts.map((post) => (
					<Link
						key={post.slug}
						href={`/blog/${post.slug}`}
						className="block p-4 border rounded-lg"
						aria-label={`Read post: ${post.title}`}>
						{post.coverImage ?
							<img
								src={post.coverImage}
								alt={post.title || ''}
								width={600}
								height={200}
								loading="lazy"
								decoding="async"
								className="w-full h-48 rounded-lg mb-2  "
							/>
						:	<div className="w-full h-48 rounded-lg mb-2 bg-black/5 dark:bg-white/5 flex items-center justify-center text-sm">
								No image
							</div>
						}

						<h2 className="text-xl font-bold mb-2">{post.title}</h2>

						<p className="text-sm text-gray-500 mb-2">
							<time dateTime={post.date || ''}>
								{post.date || 'Unknown date'}
							</time>
							{post.readingTime ? ` · ${post.readingTime}` : ''}
						</p>
					</Link>
				))}
			</div>
		</article>
	);
}
