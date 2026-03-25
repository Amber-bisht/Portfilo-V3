import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@/components/Layout';
import { getAllPostSlugs, getPostData, BlogPost } from '@/utils/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for Mermaid to avoid SSR issues
const Mermaid = dynamic(() => import('@/components/Mermaid'), { ssr: false });

// Import highlight.js styles
import 'highlight.js/styles/github-dark.css';

interface BlogPostProps {
  postData: BlogPost;
}

export default function Post({ postData }: BlogPostProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [activeId, setActiveId] = useState('');

  const toc = postData.content
    .split('\n')
    .filter(line => line.startsWith('## '))
    .map(line => ({
      title: line.replace('## ', ''),
      id: line.replace('## ', '').toLowerCase().replace(/\s+/g, '-')
    }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );
    document.querySelectorAll('h2').forEach((h2) => observer.observe(h2));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout title={`${postData.title} | Amber Bisht`}>
      <article className="min-h-screen bg-neutral-950 text-neutral-200 selection:bg-makima-red/40 pb-32">
        <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-makima-red via-makima-gold to-makima-red z-[100] origin-left" style={{ scaleX }} />

        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-makima-red/5 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-makima-gold/5 blur-[150px] rounded-full" />
        </div>

        <header className="relative pt-24 pb-16 px-6 z-10 text-left border-b border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
            <div className="flex-1 max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
                  {postData.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-neutral-600" />
                    {format(parseISO(postData.date), 'MMMM dd, yyyy')}
                  </span>
                  <span className="w-1 h-1 bg-neutral-800 rounded-full" />
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-neutral-600" />
                    {Math.ceil(postData.content.length / 800)} Min Read
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-10">
              {postData.image && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="hidden lg:block w-72 h-72 rounded-[2.5rem] overflow-hidden bg-white p-12 flex items-center justify-center shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5 relative group"
                >
                  <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-500" />
                  <img
                    src={postData.image}
                    alt={postData.title}
                    className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
              )}

              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-8 w-full"
              >
                <div className="flex flex-wrap items-center justify-center gap-8 w-full">
                  <div className="flex items-center gap-4">
                    <img src="https://i.pinimg.com/1200x/ad/f8/cb/adf8cbc0c6f2b3f964ce6f6def9658db.jpg" alt="Amber Bisht" className="w-10 h-10 rounded-full object-cover" />
                    <div className="text-left">
                      <p className="text-xs font-bold text-white tracking-wide">Amber Bisht</p>
                      <p className="text-[10px] text-neutral-600 uppercase tracking-widest font-bold">Research & Architecture</p>
                    </div>
                  </div>
                  <button onClick={() => { navigator.share?.({ title: postData.title, url: window.location.href }).catch(() => { navigator.clipboard.writeText(window.location.href); alert('Link Copied!'); }); }} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all">
                    <Share2 size={16} className="text-makima-red" /> Share
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20 mt-20 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="prose prose-invert prose-neutral max-w-none 
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-white
              prose-h2:text-4xl prose-h2:mt-24 prose-h2:mb-10 prose-h2:flex prose-h2:items-center prose-h2:gap-4
              prose-h2:before:content-[''] prose-h2:before:w-1.5 prose-h2:before:h-10 prose-h2:before:bg-makima-red prose-h2:before:rounded-full
              prose-p:text-neutral-400 prose-p:text-lg prose-p:leading-[1.8] prose-p:mb-10
              prose-strong:text-white prose-strong:font-bold
              prose-a:text-makima-red prose-a:underline-offset-4 hover:prose-a:text-makima-gold transition-all
              prose-blockquote:border-l-4 prose-blockquote:border-makima-red prose-blockquote:bg-white/5 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-2xl prose-blockquote:italic prose-blockquote:text-neutral-300 prose-blockquote:text-xl
              prose-pre:bg-neutral-900/80 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-[2rem] prose-pre:p-8 prose-pre:shadow-2xl
              prose-code:text-makima-gold prose-code:bg-makima-gold/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:text-base
              prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10
              prose-li:text-neutral-400 prose-li:text-lg prose-li:mb-4 prose-li:marker:text-makima-red
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}
              components={{
                h2: ({ node, ...props }) => <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />,
                code: ({ node, inline, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || '');
                  if (!inline && match && match[1] === 'mermaid') {
                    return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                  }
                  return !inline && match ? (
                    <div className="relative group my-12">
                      <div className="absolute -top-3 right-6 px-3 py-1 bg-neutral-800 text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/10 z-20">
                        {match[1]}
                      </div>
                      <pre className={`${className} !m-0 !overflow-visible !bg-transparent`} {...props}>
                        <code className="!bg-transparent !p-0 !text-sm !leading-relaxed !block">{children}</code>
                      </pre>
                    </div>
                  ) : (
                    <code className={`${className} bg-white/5 px-1.5 py-0.5 rounded text-makima-gold`} {...props}>{children}</code>
                  );
                }
              }}
            >
              {postData.content}
            </ReactMarkdown>
          </motion.div>

          <aside className="hidden lg:block relative">
            <div className="sticky top-40 space-y-12">
              <div>
                <nav className="flex flex-col gap-4">
                  {toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className={`text-[10px] font-bold uppercase tracking-widest transition-all hover:translate-x-2 flex items-center gap-2 ${activeId === item.id ? 'text-makima-red' : 'text-neutral-500'}`}>
                      <div className={`w-1 h-1 rounded-full bg-makima-red transition-all ${activeId === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="p-8 bg-white/5 border border-white/5 rounded-[2rem] backdrop-blur-md">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white mb-4">Contact</h4>
                <p className="text-xs text-neutral-500 leading-relaxed mb-6 font-medium">
                  Have questions about this research or want to build something similar?
                </p>
                <Link href="/#contact" className="block text-center py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-neutral-200 transition-all">
                  Get in touch
                </Link>
              </div>
            </div>
          </aside>
        </div>


      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.slug as string);
  return { props: { postData } };
};
