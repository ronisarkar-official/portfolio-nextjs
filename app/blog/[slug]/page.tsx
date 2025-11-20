import { getSanityPostBySlug, getAllPostSlugs, calculateReadingTime, urlFor } from '@/lib/sanity';
import ViewCounter from '@/components/blog/ViewCounter';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from '@/components/blog/PortableTextComponents';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import type { Metadata } from 'next';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// Generate static paths for all posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSanityPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.metaKeywords,
    openGraph: {
      title: post.title,
      description: post.seo?.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.mainImage?.asset
        ? [urlFor(post.mainImage).width(1200).height(630).url()]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: post.mainImage?.asset
        ? [urlFor(post.mainImage).width(1200).height(630).url()]
        : [],
    },
    alternates: {
      canonical: `https://ronisarkar.spechype.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getSanityPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.body);

  // JSON-LD for Article
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.mainImage?.asset
      ? [urlFor(post.mainImage).width(1200).url()]
      : [],
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.social?.website || 'https://ronisarkar.spechype.com',
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
    keywords: post.seo?.metaKeywords?.join(', '),
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
                title={post.title}
                aria-label={post.title}>
                {post.title.length > 10 ? `${post.title.slice(0, 10)}...` : post.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <article className="mx-auto max-w-4xl px-4">
        {/* Hero Image */}
        {post.mainImage?.asset && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={urlFor(post.mainImage).width(1200).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
            {post.mainImage.caption && (
              <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                {post.mainImage.caption}
              </figcaption>
            )}
          </div>
        )}

        {/* Header */}
        <header className="mb-16">
          <div className="space-y-6">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium"
                    style={
                      category.color
                        ? {
                            backgroundColor: `${category.color}15`,
                            borderColor: `${category.color}40`,
                            color: category.color,
                          }
                        : undefined
                    }
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 border-b border-t border-border py-4 text-sm text-muted-foreground">
              {/* Author */}
              <div className="flex items-center gap-2">
                {post.author.image?.asset && (
                  <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span className="font-medium text-foreground">
                  {post.author.name}
                </span>
              </div>

              {/* Metadata: Views • Relative Time */}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <ViewCounter slug={post.slug.current} initialViews={post.views} />
                <span>•</span>
                <time dateTime={post.publishedAt}>
                  {formatRelativeTime(post.publishedAt)}
                </time>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="prose prose-zinc dark:prose-invert max-w-none">
          <PortableText value={post.body} components={portableTextComponents} />
        </main>

        {/* Author Bio */}
       

        {/* Footer */}
        <footer className="mt-24">
          <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
            <div className="p-6">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                {/* Date info */}
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span className="font-medium">
                      Published {formatDate(post.publishedAt)}
                    </span>
                  </div>
                </div>

                {/* Back to blog link */}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span>More posts</span>
                  <ArrowLeftIcon className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
