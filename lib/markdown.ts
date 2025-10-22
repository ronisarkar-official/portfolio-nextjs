import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface MarkdownPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  readingTime?: string;
  draft?: boolean;
}

/**
 * Calculate reading time based on word count
 * @param text - Text content to analyze
 * @returns Reading time string (e.g., "5 min read")
 */
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Get all post slugs from the blog directory
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

/**
 * Get a single post by slug with full content
 * Cached to prevent repeated file system reads
 */
export const getPostBySlug = cache((slug: string): MarkdownPost => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const readingTime = calculateReadingTime(content);
  const excerpt = data.excerpt || content.slice(0, 150).trim() + '...';

  return {
    slug: realSlug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    content,
    excerpt,
    coverImage: data.coverImage,
    tags: data.tags || [],
    readingTime,
    draft: data.draft || false,
  };
});

/**
 * Convert markdown content to HTML
 * Cached for performance
 */
export const getMarkdownContent = cache(async (markdown: string): Promise<string> => {
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(markdown);
  
  return processedContent.toString();
});

/**
 * Get all posts sorted by date (newest first)
 * Filters out draft posts in production
 * Cached to prevent repeated file system reads
 */
export const getAllPosts = cache((): MarkdownPost[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => {
      // Show drafts in development, hide in production
      if (process.env.NODE_ENV === 'production' && post.draft) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  
  return posts;
});