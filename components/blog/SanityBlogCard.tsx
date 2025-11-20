import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { PostCard } from '@/types/sanity.types';
import { formatRelativeTime } from '@/lib/utils';
import ViewCounter from './ViewCounter';

interface SanityBlogCardProps {
	post: PostCard;
}



const SanityBlogCard: React.FC<SanityBlogCardProps> = ({ post }) => {
	// Calculate approximate reading time from excerpt
	const wordCount = post.excerpt ? post.excerpt.split(/\s+/).length : 50;
	const minutes = Math.ceil(wordCount / 200) || 1; // Average reading speed: 200 words/min
	const readingTime = `${minutes} min read`;

	return (
		<Link
			key={post._id}
			href={`/blog/${post.slug}`}
			className="block p-4 border rounded-lg"
			aria-label={`Read post: ${post.title}`}>
			{post.mainImage?.url ? (
				<div className="relative border rounded-lg overflow-hidden mb-2 h-48">
					<Image
						src={post.mainImage.url}
						alt={post.mainImage.alt || post.title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover"
						loading="lazy"
					/>
				</div>
			) : (
				<div className="w-full h-48 rounded-lg mb-2 bg-black/5 dark:bg-white/5 flex items-center justify-center text-sm">
					No image
				</div>
			)}

			<h2 className="text-xl font-bold mb-2">{post.title}</h2>

			<div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
				<ViewCounter
					slug={post.slug}
					initialViews={post.views}
					trackView={false}
				/>
				<span>•</span>
				<time dateTime={post.publishedAt}>
					{formatRelativeTime(post.publishedAt)}
				</time>
			</div>
		</Link>
	);
};

export default SanityBlogCard;
