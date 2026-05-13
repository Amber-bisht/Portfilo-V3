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

const getTextFromReactChildren = (children: any): string => {
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(getTextFromReactChildren).join('');
  if (children && children.props && children.props.children) {
    return getTextFromReactChildren(children.props.children);
  }
  return '';
};

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');

  if (!inline && match && match[1] === 'mermaid') {
    return <Mermaid chart={String(children).replace(/\n$/, '')} />;
  }

  if (!inline && match) {
    const codeString = getTextFromReactChildren(children).replace(/\n$/, '');

    const handleCopy = () => {
      navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative group my-12 rounded-[14px] overflow-hidden bg-[#0d0d0d] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between px-4 py-3 bg-[#1e1e1e] border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
            {match[1]}
          </div>

          <button 
            onClick={handleCopy}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer z-10"
            title="Copy code"
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            )}
          </button>
        </div>
        <div className="p-0 overflow-x-auto">
          <pre className="!m-0 !p-5 md:!p-6 !bg-transparent min-w-full">
            <code className={`${className} !bg-transparent !p-0 text-[13px] md:text-[14px] leading-[1.6] !block font-mono font-medium`} style={{ display: 'inline-block', minWidth: '100%' }} {...props}>
              {children}
            </code>
          </pre>
        </div>
      </div>
    );
  }

  // Inline code block
  return (
    <code className={`${className} bg-white/5 px-2 py-1 rounded text-makima-gold font-mono text-[14px]`} {...props}>
      {children}
    </code>
  );
};

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

  // Special case for 'how-appx-works' - render raw markdown within Layout
  if (postData.slug === 'how-appx-works') {
    return (
      <Layout title={`${postData.title} | Amber Bisht`}>
        <div className="min-h-screen bg-neutral-950 text-neutral-200 p-8 md:p-20">
          <article className="max-w-4xl mx-auto">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-8 text-white" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-12 mb-6 text-white" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white" {...props} />,
                p: ({ node, ...props }) => <p className="text-neutral-400 text-lg leading-relaxed mb-6" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-6 text-neutral-400" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-6 text-neutral-400" {...props} />,
                code: CodeBlock,
                pre: ({ children }) => <>{children}</>,
                a: ({ node, ...props }) => <a className="text-makima-red hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
              }}
            >
              {postData.content}
            </ReactMarkdown>
          </article>
        </div>
      </Layout>
    );
  }

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
            className="max-w-none text-neutral-400"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-5xl md:text-6xl font-black mt-32 mb-16 flex items-center gap-6 before:content-[''] before:w-3 before:h-14 before:bg-makima-red before:rounded-full text-white font-sans tracking-tight" id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-4xl md:text-5xl font-black mt-24 mb-12 flex items-center gap-5 before:content-[''] before:w-2.5 before:h-12 before:bg-makima-red before:rounded-full text-white font-sans tracking-tight leading-tight" id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-2xl md:text-3xl font-black mt-16 mb-8 flex items-center gap-4 before:content-[''] before:w-1.5 before:h-8 before:bg-makima-gold before:rounded-full text-white font-sans tracking-tight leading-snug" id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-white font-sans tracking-wide" id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />,
                p: ({ node, ...props }) => <p className="text-neutral-400 text-lg md:text-xl leading-[1.8] mb-10 font-sans font-medium" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-none md:text-xl space-y-4 text-neutral-400 text-lg mb-10 font-sans font-medium ml-4 border-l-2 border-white/10 pl-6" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal md:text-xl list-inside space-y-4 text-neutral-400 text-lg mb-10 font-sans font-medium ml-4" {...props} />,
                li: ({ node, ...props }) => <li className="text-neutral-400 relative before:content-[''] before:absolute before:-left-6 before:top-3 before:w-2 before:h-2 before:rounded-full before:bg-makima-red" {...props} />,
                a: ({ node, ...props }) => <a className="text-makima-red underline underline-offset-8 hover:text-makima-gold transition-colors font-bold" target="_blank" rel="noopener noreferrer" {...props} />,
                strong: ({ node, ...props }) => <strong className="text-white font-black" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-makima-red bg-neutral-900/50 py-10 px-12 rounded-[2rem] italic text-neutral-300 text-xl md:text-2xl my-16 shadow-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-makima-red/5 before:to-transparent before:pointer-events-none" {...props} />,
                hr: () => null,
                table: ({ node, ...props }) => <div className="overflow-x-auto my-16 bg-neutral-900/50 rounded-[2rem] border border-white/10 shadow-2xl"><table className="w-full border-collapse text-left" {...props} /></div>,
                th: ({ node, ...props }) => <th className="border-b border-white/10 bg-black/40 px-8 py-6 text-left text-white font-black tracking-[0.2em] uppercase text-xs" {...props} />,
                td: ({ node, ...props }) => <td className="border-b border-white/5 px-8 py-6 text-neutral-400 font-sans text-sm md:text-base font-medium" {...props} />,
                img: ({ node, ...props }) => <img className="rounded-[2rem] border border-white/10 my-16 w-full object-cover shadow-2xl hover:scale-[1.02] transition-transform duration-700" {...props} />,
                pre: ({ children }) => <>{children}</>,
                code: CodeBlock
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
