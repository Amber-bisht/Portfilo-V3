import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { getSortedPostsData, BlogPost } from '@/utils/blog';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface BlogIndexProps {
  allPostsData: BlogPost[];
}

export default function BlogIndex({ allPostsData }: BlogIndexProps) {
  return (
    <Layout title="Blog | Amber Bisht">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="relative mb-16">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-makima-red/10 blur-[100px] rounded-full pointer-events-none" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tighter"
          >
            Blogs
          </motion.h1>
        </div>

        {/* Blog List */}
        <div className="max-w-4xl space-y-6">
          {allPostsData.map((post, index) => {
            // Calculate reading time dynamically based on content word count
            const wordsPerMinute = 200;
            const wordCount = post.content ? post.content.split(/\s+/).length : 0;
            const readingTime = Math.ceil(wordCount / wordsPerMinute);

            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.1 }}
              >
                <Link href={`/${post.slug}`} className="group block">
                  <article className="relative bg-neutral-900/30 hover:bg-neutral-900/60 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
                    
                    {/* Glowing Accent on Hover */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-makima-red/5 blur-[40px] rounded-full pointer-events-none -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />
                    
                    {/* Left: Content Section */}
                    <div className="flex-grow relative z-10 space-y-3">
                      {/* Meta Tags: Date, Category, Reading Time */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-mono">
                        {post.date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-makima-red" />
                            {format(parseISO(post.date), 'MMMM dd, yyyy')}
                          </span>
                        )}
                        {readingTime > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-makima-red" />
                            {readingTime} min read
                          </span>
                        )}
                        {post.category && (
                          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] uppercase tracking-wider font-semibold">
                            {post.category}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-cinzel font-bold text-white group-hover:text-makima-red transition-all duration-300 leading-tight tracking-wide">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-400 text-sm leading-relaxed max-w-2xl line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Right: Read Button / Arrow */}
                    <div className="flex items-center gap-3 self-start md:self-center shrink-0 relative z-10">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/60 group-hover:text-makima-red opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 hidden sm:inline">
                        Read Post
                      </span>
                      <div className="p-3 rounded-full bg-white/5 group-hover:bg-makima-red/10 border border-white/5 group-hover:border-makima-red/20 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-makima-red transform group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>

                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {allPostsData.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500">No blog posts found. Stay tuned!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
