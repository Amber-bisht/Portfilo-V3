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
        <div className="relative mb-16 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-makima-red/10 blur-[100px] rounded-full pointer-events-none" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter"
          >
            Insights <span className="text-makima-red">&</span> Research
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Documenting my journey through reverse engineering, scalable architecture, and the evolving landscape of DevOps.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPostsData.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <Link href={`/${post.slug}`} className="group block h-full">
                <article className="group relative bg-neutral-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-300 shadow-xl flex flex-col h-full">
                  
                  {/* Glowing Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-makima-red/5 blur-[40px] rounded-full pointer-events-none -mr-8 -mt-8 group-hover:bg-makima-red/10 transition-colors z-[1]" />
                  
                  {/* Image Section */}
                  <div className="relative h-64 w-full bg-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-transparent z-10" />
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-makima-red/10 to-transparent" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-[5]" />
                  </div>

                  {/* Content Section */}
                  <div className="px-6 pb-6 pt-4 flex flex-col flex-grow relative z-10">
                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-cinzel font-bold text-white mb-3 group-hover:text-makima-red transition-all duration-300 line-clamp-2 leading-tight tracking-wide">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Action */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-center py-2 bg-white text-black text-xs font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                        Read Analysis
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
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
