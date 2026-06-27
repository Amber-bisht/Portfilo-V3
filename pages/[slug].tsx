import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@/components/Layout';
import { getAllPostSlugs, getPostData, BlogPost } from '@/utils/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ChevronDown } from 'lucide-react';
import Head from 'next/head';

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

const FAQAccordionItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left font-bold text-white hover:text-makima-red transition-colors duration-300 gap-4 cursor-pointer animate-none"
      >
        <span className="text-base sm:text-lg">{question}</span>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-makima-red' : ''}`} 
        />
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 text-sm sm:text-base text-gray-400 leading-relaxed border-t border-white/5 bg-black/10">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeHighlight]}
            components={{
              p: ({ node, ...props }) => <p className="mb-0" {...props} />,
              code: CodeBlock,
              strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,
              a: ({ node, ...props }) => <a className="text-makima-red hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default function Post({ postData }: BlogPostProps) {
  // Parse FAQs out of markdown content
  const parts = postData.content.split('## Frequently Asked Questions');
  const mainContent = parts[0];
  const faqContent = parts[1] || '';

  const faqs: { question: string; answer: string }[] = [];
  if (faqContent) {
    const faqParts = faqContent.split('### ');
    for (let i = 1; i < faqParts.length; i++) {
      const faqPart = faqParts[i].trim();
      const lines = faqPart.split('\n');
      const question = lines[0].trim();
      const answer = lines.slice(1).join('\n').trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }

  return (
    <Layout title={`${postData.title} | Amber Bisht`}>
      <Head>
        {faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer.replace(/`([^`]+)`/g, '$1')
                  }
                }))
              })
            }}
          />
        )}
      </Head>
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
              blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-makima-red bg-neutral-900/50 py-6 px-8 rounded-xl italic text-neutral-300 text-lg my-8" {...props} />,
              hr: ({ node, ...props }) => <hr className="border-white/10 my-10" {...props} />,
              table: ({ node, ...props }) => <div className="overflow-x-auto my-8 bg-neutral-900/30 rounded-xl border border-white/5"><table className="w-full border-collapse text-left" {...props} /></div>,
              th: ({ node, ...props }) => <th className="border-b border-white/10 bg-black/20 px-6 py-4 text-left text-white font-bold text-sm" {...props} />,
              td: ({ node, ...props }) => <td className="border-b border-white/5 px-6 py-4 text-neutral-400 text-sm" {...props} />,
              strong: ({ node, ...props }) => <strong className="text-white font-semibold" {...props} />,
              img: ({ node, alt, ...props }: any) => <img alt={alt || ""} className="rounded-xl border border-white/10 my-8 w-full object-cover" {...props} />,
            }}
          >
            {mainContent}
          </ReactMarkdown>

          {faqs.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-16">
              <h2 className="text-3xl font-bold mb-8 text-white">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <FAQAccordionItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
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
