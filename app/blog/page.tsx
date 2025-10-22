import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/lib/markdown';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Read articles about web development, software engineering, and technology insights.',
};

// Revalidate every hour for fresh content
export const revalidate = 3600;

export default async function BlogPage() {
	const posts = getAllPosts();

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
