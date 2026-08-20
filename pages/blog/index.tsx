import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { getSortedPostsData, BlogPost } from '@/utils/blog';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Volume2, Sparkles } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface BlogIndexProps {
  allPostsData: BlogPost[];
}

export default function BlogIndex({ allPostsData }: BlogIndexProps) {
  return (
    <Layout title="Engineering & Security Notes | Amber Bisht">
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

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {allPostsData.map((post, index) => {
            const wordsPerMinute = 200;
            const wordCount = post.content ? post.content.split(/\s+/).length : 0;
            const fallbackReadingTime = Math.ceil(wordCount / wordsPerMinute);
            const displayReadTime = post.readTime || (fallbackReadingTime > 0 ? `${fallbackReadingTime} min read` : '5 min read');

            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 + 0.15 }}
                className="h-full"
              >
                <Link href={`/${post.slug}`} className="group block h-full">
                  <article className="h-full relative bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/10 hover:border-white/20 rounded-3xl p-7 md:p-9 transition-all duration-500 shadow-2xl flex flex-col justify-between overflow-hidden">
                    
                    {/* Atmospheric Glow on Hover */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-makima-red/10 blur-[60px] rounded-full pointer-events-none -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[1]" />
                    
                    {/* Top Content */}
                    <div className="relative z-10 space-y-4">
                      
                      {/* Meta Tags Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 font-mono">
                        <div className="flex items-center gap-3">
                          {post.date && (
                            <span className="flex items-center gap-1.5 text-zinc-400">
                              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                              {format(parseISO(post.date), 'MMM dd, yyyy')}
                            </span>
                          )}
                        </div>

                        {/* Read Time / Audio Available */}
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-zinc-400">
                            <Clock className="w-3.5 h-3.5 text-zinc-500" />
                            {displayReadTime}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400/90 text-[11px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <Volume2 className="w-3 h-3" />
                            <span>Audio</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Title */}
                      <h2 className="text-xl md:text-2xl font-cinzel font-bold text-white group-hover:text-makima-red transition-colors duration-300 leading-snug tracking-wide pt-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-zinc-400 text-sm md:text-[15px] leading-relaxed line-clamp-3 pt-1">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="relative z-10 pt-8 mt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        By Amber Bisht
                      </span>
                      
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">
                        <span>Read Article</span>
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-makima-red text-zinc-300 group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
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
