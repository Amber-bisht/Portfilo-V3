import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'data');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  [key: string]: any;
}

export function getSortedPostsData(): BlogPost[] {
  // Get file names under /data
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Extract title from content if not in frontmatter
      let title = matterResult.data.title;
      if (!title) {
        const titleMatch = matterResult.content.match(/^#\s+(.*)/m);
        title = titleMatch ? titleMatch[1] : slug;
      }

      // Extract excerpt if not in frontmatter
      let excerpt = matterResult.data.excerpt;
      if (!excerpt) {
          excerpt = matterResult.content
            .replace(/^#\s+.*$/m, '') // remove H1
            .replace(/>\s+.*\n/g, '') // remove blockquotes
            .trim()
            .substring(0, 160) + '...';
      }

      // Combine the data with the slug
      return {
        slug,
        title,
        date: matterResult.data.date || '2026-03-25', // Fallback date
        excerpt,
        content: matterResult.content,
        ...matterResult.data,
      } as BlogPost;
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

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Extract title from content if not in frontmatter
  let title = matterResult.data.title;
  if (!title) {
    const titleMatch = matterResult.content.match(/^#\s+(.*)/m);
    title = titleMatch ? titleMatch[1] : slug;
  }

  // Combine the data with the slug
  return {
    slug,
    title,
    date: matterResult.data.date || '2026-03-25',
    excerpt: matterResult.data.excerpt || '',
    content: matterResult.content,
    ...matterResult.data,
  };
}
