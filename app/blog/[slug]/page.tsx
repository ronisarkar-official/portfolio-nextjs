import MDXContent from '@/components/MDXContent';
import LinkWithIcon from '@/components/LinkWithIcon';
import { Separator } from '@/components/ui/Separator';
import { getPostBySlug, getAllPosts, getMarkdownContent } from '@/lib/markdown';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, AlertTriangleIcon, Edit3Icon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import BlogImage from '@/components/BlogImage';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Revalidate every hour for fresh content
export const revalidate = 3600;

// Helper function to format dates
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export async function generateStaticParams() {
	const posts = getAllPosts();
	const slugs = posts.map((post) => ({ slug: post.slug }));
	return slugs;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		return {
			title: 'Post Not Found',
		};
	}

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.coverImage ? [{ url: post.coverImage }] : [],
			type: 'article',
			publishedTime: post.date,
			authors: ['Roni Sarkar'],
			tags: post.tags,
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.excerpt,
			creator: '@ronisarkarDev',
		},
		alternates: {
			canonical: `https://ronisarkar.spechype.com/blog/${slug}`,
		},
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const content = await getMarkdownContent(post.content);
	
	const {
		title,
		coverImage,
		date,
		tags,
		readingTime,	
		draft,
	} = post;

	// JSON-LD for Article
	const articleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		image: coverImage ? [coverImage] : [],
		datePublished: date,
		dateModified: date,
		author: {
			'@type': 'Person',
			name: 'Roni Sarkar',
			url: 'https://ronisarkar.spechype.com',
		},
		publisher: {
			'@type': 'Organization',
			name: 'Roni Sarkar',
			logo: {
				'@type': 'ImageObject',
				url: 'https://ronisarkar.spechype.com/favicon.ico',
			},
		},
		description: post.excerpt,
		keywords: tags?.join(', '),
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://ronisarkar.spechype.com/blog/${slug}`,
		},
	};

	return (
		<div className="min-h-screen bg-background">
			{/* JSON-LD for Article */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
			/>

			{/* Navigation */}
			<nav className="mb-12">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/blog">Blogs</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							
							<BreadcrumbPage
								title={title}
								aria-label={title}>
								{title &&
									(title.length > 10 ? `${title.slice(0, 10)}...` : title)}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</nav>

			<article className="mx-auto max-w-4xl px-4">
				{/* Draft Banner */}
				{draft && (
					<div className="mb-12">
						<div className="overflow-hidden rounded-lg border border-orange-200 bg-orange-50 shadow-sm dark:border-orange-800 dark:bg-orange-950">
							<div className="p-6">
								<div className="flex items-center gap-4">
									<AlertTriangleIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
									<p className="text-sm leading-relaxed text-orange-700 dark:text-orange-300">
										This content is in progress and may contain incomplete or
										unpolished sections.
									</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Featured Image */}
				{coverImage && (
					<BlogImage
						src={coverImage}
						alt={title || ''}
					/>
				)}

				{/* Header */}
				<header className="mb-16">
					<div className="space-y-6">
						<h1 className="bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
							{title}
						</h1>

						{/* Metadata section */}
						<div className="flex flex-col gap-4 pt-2">
							{/* Reading time & Published date */}
							<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
								{/* Reading time */}
								<div className="flex items-center gap-1.5">
									<ClockIcon className="h-4 w-4" />
									<span>{readingTime}</span>
								</div>

								<Separator
									orientation="vertical"
									className="hidden h-4 sm:block"
								/>

								{/* Published date */}
								<div className="flex items-center gap-1.5">
									<CalendarIcon className="h-4 w-4" />
									<span>Published {formatDate(date)}</span>
								</div>
							</div>

							{/* Tags row */}
							{tags && tags.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{tags.map((tag: string) => (
										<Badge
											key={tag}
											variant="secondary"
											className="px-3 py-1 text-xs font-medium">
											{tag}
										</Badge>
									))}
								</div>
							)}
						</div>
					</div>
				</header>

				{/* Content */}
				<main>
					<MDXContent content={content} />
				</main>

				{/* Footer */}
				<footer className="mt-24">
					<div className="overflow-hidden rounded-lg border bg-card shadow-sm">
						<div className="p-6">
							<div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
								{/* Date info */}
								<div className="space-y-2 text-sm text-muted-foreground">
									{/* Draft status indicator */}
									{draft && (
										<p className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
											<Edit3Icon className="h-3.5 w-3.5" />
											<span className="font-semibold">Draft</span>
										</p>
									)}

									{/* Publication date */}
									<div className="flex items-center gap-1.5">
										<CalendarIcon className="h-3.5 w-3.5" />
										<span className="font-medium">
											Published {formatDate(date)}
										</span>
									</div>
								</div>

								{/* Back to blog link */}
								<LinkWithIcon
									href="/blog"
									position="right"
									icon={<ArrowLeftIcon className="size-4 rotate-180" />}
									text="More posts"
									className="text-muted-foreground transition-colors hover:text-primary"
								/>
							</div>
						</div>
					</div>
				</footer>
			</article>
		</div>
	);
}
