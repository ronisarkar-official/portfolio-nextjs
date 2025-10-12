import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export type Post = {
  slug: string;
  title: string;
  image?: string;
  publishedAt: string;
};

export type PostSummary = Post;
import { cn } from '@/lib/utils';

export function PostItem({
	post,
	shouldPreloadImage,
}: {
	post: Post;
	shouldPreloadImage?: boolean;
}) {
	return (
		<Link
			href={`/blog/${post.slug}`}
			className={cn(
				'group/post flex flex-col gap-2 p-2',
				'max-sm:screen-line-before max-sm:screen-line-after',
				'sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after',
			)}>
			<div className="border rounded-lg p-2">
				{post.image && (
					<div className="relative select-none [&_img]:aspect-1200/630 [&_img]:rounded-lg">
						<Image
							src={post.image}
							alt={post.title}
							width={1200}
							height={630}
							quality={100}
							priority={shouldPreloadImage}
							unoptimized
						/>

						<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
					</div>
				)}

				<div className="flex flex-col gap-1 p-2">
					<h3 className="text-lg leading-snug font-medium text-balance underline-offset-4 group-hover/post:underline">
						{post.title}
					</h3>

					<dl>
						<dt className="sr-only">Published on</dt>
						<dd className="text-sm text-muted-foreground">
							<time dateTime={dayjs(post.publishedAt).toISOString()}>
								{dayjs(post.publishedAt).format('DD.MM.YYYY')}
							</time>
						</dd>
					</dl>
				</div>
			</div>
		</Link>
	);
}

interface PostsProps {
	posts: PostSummary[];
}

export default function Posts({ posts }: PostsProps) {
	return (
		<section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
			{posts.map((post, index) => (
				<PostItem
					key={post.slug}
					post={post as Post}
					shouldPreloadImage={index === 0}
				/>
			))}
		</section>
	);
}
