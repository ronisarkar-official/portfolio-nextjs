import BlogSearch from '@/components/blog/BlogSearch';
import { getAllSanityPosts, getAllCategories } from '@/lib/sanity';

export default async function BlogPage() {
	// Fetch data server-side in parallel for optimal performance
	const [posts, categories] = await Promise.all([
		getAllSanityPosts(),
		getAllCategories(),
	]);

	return (
		<article className="mt-8 flex flex-col gap-8 pb-16">
			<div className="flex flex-col gap-4">
				<h1 className="title text-4xl font-bold">My Blogs</h1>
				<p className="text-muted-foreground">
					Thoughts, tutorials, and insights about web development and
					technology.
				</p>
			</div>

			{/* Client-side search and filtering */}
			<BlogSearch
				initialPosts={posts}
				categories={categories}
			/>
		</article>
	);
}
