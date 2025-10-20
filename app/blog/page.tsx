import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/markdown';


// Revalidate every 60 seconds to get fresh posts
export const revalidate = 60;

export default async function BlogPage() {
	const posts = await getAllPosts();

	return (
		<article className="mt-8 flex flex-col gap-8 pb-16">
			<h1 className="title">My Blogs</h1>
			
			<div className="grid gap-4 md:grid-cols-2">
				{posts.map((post) => (
					<BlogCard key={post.slug} post={post} />
				))}
			</div>
		</article>
	);
}
