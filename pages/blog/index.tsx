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
                <article className="relative h-full bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-10 hover:border-makima-red/30 transition-all duration-500 hover:shadow-[0_40px_100px_rgba(0,0,0,0.4)] flex flex-col group overflow-hidden">
                  {/* Premium Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-makima-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-makima-red/10 blur-[80px] rounded-full group-hover:bg-makima-red/20 transition-all duration-700" />
                  
                  {/* Card Image */}
                  <div className="relative h-64 -mx-10 -mt-10 mb-8 overflow-hidden bg-white flex items-center justify-center p-6">
                      {post.image ? (
                        <>
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                            />
                        </>
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-makima-red/10 to-transparent" />
                      )}
                  </div>

                  <div className="relative z-10">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-[10px] font-black text-neutral-500 mb-6 uppercase tracking-[0.3em]">
                        <span className="flex items-center gap-2">
                        <Calendar size={14} className="text-makima-red/60" />
                        {format(parseISO(post.date), 'MMM dd, yyyy')}
                        </span>
                        <span className="w-1.5 h-1.5 bg-neutral-800 rounded-full" />
                        <span>{Math.ceil(post.content.length / 800)} Min Read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-black text-white mb-6 group-hover:text-makima-red transition-all duration-300 line-clamp-2 leading-tight relative z-10">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-neutral-500 text-sm leading-relaxed mb-10 line-clamp-3 font-medium relative z-10">
                    {post.excerpt}
                  </p>

                  {/* Action */}
                  <div className="mt-auto flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] group-hover:translate-x-3 transition-transform duration-700 flex items-center gap-3">
                      View Analysis <ArrowRight size={16} className="text-makima-red" />
                    </span>
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
