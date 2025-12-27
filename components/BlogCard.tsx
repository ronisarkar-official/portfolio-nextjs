import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
			className="p-4 border rounded-lg min-h-80 max-h-80 flex flex-col overflow-hidden"
			aria-label={`Read post: ${post.title}`}>
			{post.coverImage ? (
				<div className="relative border rounded-lg overflow-hidden mb-2 h-48 flex-shrink-0">
					<Image
						src={post.coverImage}
						alt={post.title || 'Blog post cover'}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover"
						loading="lazy"
					/>
				</div>
			) : (
				<div className="w-full h-48 rounded-lg mb-2 bg-black/5 dark:bg-white/5 flex items-center justify-center text-sm flex-shrink-0">
					No image
				</div>
			)}

			<h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>

			<p className="text-sm text-muted-foreground mt-auto">
				<time dateTime={post.date || ''}>{post.date || 'Unknown date'}</time>
				{post.readingTime ? ` · ${post.readingTime}` : ''}
			</p>
		</Link>
	);
};

export default BlogCard;
