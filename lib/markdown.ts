import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

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
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}

export function getPostBySlug(slug: string): MarkdownPost {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);
  
  // Calculate reading time (approx. 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readingTime = `${Math.ceil(wordCount / 200)} min read`;

  return {
    slug: realSlug,
    title: data.title || '',
    date: data.date || '',
    content: content,
    excerpt: data.excerpt || content.slice(0, 150) + '...',
    coverImage: data.coverImage || '',
    tags: data.tags || [],
    readingTime
  };
}

export async function getMarkdownContent(markdown: string) {
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(markdown);
  
  return processedContent.toString();
}

export function getAllPosts(): MarkdownPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // Sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  
  return posts;
}