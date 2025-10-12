import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage?: string;
  excerpt?: string;
  content?: string;
  readingTime?: string;
  draft?: boolean;
};

export async function getPosts(): Promise<Post[]> {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    // Calculate reading time (rough estimate)
    const wordCount = matterResult.content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min read`;

    // Combine the data with the slug
    return {
      slug,
      readingTime,
      ...(matterResult.data as { title: string; date: string; coverImage?: string; excerpt?: string; draft?: boolean }),
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}