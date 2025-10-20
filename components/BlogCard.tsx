import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';

type Post = {
	slug: string;
	coverImage?: string;
	title?: string;
	date?: string;
	readingTime?: string;
};

type BlogCardProps = {
	post: Post;
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
	return (
		<Link
			key={post.slug}
			href={`/blog/${post.slug}`}
			className="block p-4 border rounded-lg"
			aria-label={`Read post: ${post.title}`}>
			{post.coverImage ? (
				<div className=" border rounded-lg overflow-hidden mb-2">
					<img
						src={post.coverImage}
						alt={post.title || ''}
						width={600}
						height={200}
						loading="lazy"
						decoding="async"
						className="w-full h-48"
					/>
				</div>
			) : (
				<div className="w-full h-48 rounded-lg mb-2 bg-black/5 dark:bg-white/5 flex items-center justify-center text-sm">
					No image
				</div>
			)}

			<h2 className="text-xl font-bold mb-2">{post.title}</h2>

			<p className="text-sm text-gray-500 mb-2">
				<time dateTime={post.date || ''}>{post.date || 'Unknown date'}</time>
				{post.readingTime ? ` · ${post.readingTime}` : ''}
			</p>
		</Link>
	);
};

export default BlogCard;
