export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category?: string;
  image?: string;
  content: string;
  readTime?: string;
}

const staticPosts: BlogPost[] = [
  {
    slug: 'economics-of-bot-wars',
    title: 'The Economics of Bot Wars: How CAPTCHAs, Fingerprinting, and Bypass Strategies Shape the Modern Web',
    date: '2026-06-21',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    readTime: '9 min read',
    excerpt: 'An in-depth analysis of modern bot protection mechanisms (Cloudflare, reCAPTCHA, JA3/JA4), how automated bypasses operate, and why bot defense is fundamentally a game of economics rather than pure mathematics.',
    content: 'An in-depth security analysis of modern bot protection mechanisms, automated bypasses, and low-level web defense.'
  },
  {
    slug: 'how-i-secured-video-streaming-lms',
    title: 'Building a Piracy-Resistant Video LMS: Architecture Behind AES-128 HLS Delivery',
    date: '2026-03-25',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    readTime: '5 min read',
    excerpt: 'An architectural deep dive into designing a cost-effective, piracy-resistant video delivery pipeline using AES-128 HLS encryption, CloudFront signed URLs, and Web Worker decryption.',
    content: 'An engineering deep dive into the architecture of a piracy-resistant video LMS using AES-128 HLS delivery, AWS Elemental MediaConvert, CloudFront signed URLs, and Web Worker decryption.'
  }
];

export function getSortedPostsData(): BlogPost[] {
  return staticPosts;
}

export function getAllPostSlugs() {
  return staticPosts.map((post) => ({
    params: { slug: post.slug }
  }));
}

export async function getPostData(slug: string): Promise<BlogPost> {
  const post = staticPosts.find((p) => p.slug === slug);
  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }
  return post;
}
