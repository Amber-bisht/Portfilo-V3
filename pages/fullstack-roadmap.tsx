import React from 'react';
import Layout from '@/components/Layout';
import { motion, useScroll, useSpring } from 'framer-motion';
import { getTechIcon } from '@/utils/techIcons';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Boxes, 
  Radio, 
  Cloud, 
  Rocket
} from 'lucide-react';

interface Topic {
  title: string;
  items: string[];
}

interface MilestoneProject {
  title: string;
  description: string;
  tech: string[];
}

interface Phase {
  id: number;
  stepNum: string;
  title: string;
  duration: string;
  category: 'Frontend' | 'TypeScript' | 'Backend' | 'Security' | 'Fullstack' | 'Real-Time' | 'DevOps';
  icon: React.ElementType;
  summary: string;
  topics: Topic[];
  milestoneProject: MilestoneProject;
}

const phases: Phase[] = [
  {
    id: 1,
    stepNum: '01',
    title: 'Web Foundations (HTML5 & CSS3)',
    duration: '3-5 Days',
    category: 'Frontend',
    icon: Code2,
    summary: 'Build pixel-perfect, accessible, semantic, and responsive user interfaces from scratch.',
    topics: [
      {
        title: 'Semantic HTML5',
        items: ['Structural tags (<main>, <article>, <nav>, <header>)', 'Form controls & native validation', 'WAI-ARIA accessibility & screen readers', 'SEO meta headers & OpenGraph']
      },
      {
        title: 'Modern CSS3',
        items: ['Box Model & CSS Custom Properties', 'Flexbox & CSS Grid deep-dive', 'Mobile-first responsive media queries', 'Transitions, CSS Animations & Glassmorphism']
      }
    ],
    milestoneProject: {
      title: 'Personal Landing & Portfolio Page',
      description: 'Fully responsive, multi-section personal portfolio baseline built purely with standard HTML5 and CSS3 styling.',
      tech: ['HTML5', 'CSS3', 'Flexbox/Grid', 'ARIA']
    }
  },
  {
    id: 2,
    stepNum: '02',
    title: 'JavaScript Mastery (ES6+)',
    duration: '20-25 Days',
    category: 'Frontend',
    icon: Terminal,
    summary: 'Master asynchronous programming, DOM manipulation, closures, and modern ES6+ JS features.',
    topics: [
      {
        title: 'Core Fundamentals',
        items: ['Scope, Hoisting & Closures', 'Execution Context & Call Stack', 'Prototypes & Prototypal Inheritance', 'Event Loop, Microtasks & Macrotasks']
      },
      {
        title: 'Modern ES6+ Syntax',
        items: ['Destructuring & Rest/Spread operators', 'Array methods (map, filter, reduce, flatMap)', 'ES Modules (import / export)', 'Arrow functions & Lexical scoping']
      },
      {
        title: 'Asynchronous JS & Web APIs',
        items: ['Promises & Promises API (all, settle, race)', 'async / await pattern & error handling', 'Fetch API & REST request lifecycle', 'DOM Event Delegation & Storage APIs']
      }
    ],
    milestoneProject: {
      title: 'Tic-Tac-Toe Game & Weather Dashboard',
      description: 'Interactive game with local scorekeeping and win algorithms, alongside a dynamic REST API Weather app.',
      tech: ['JavaScript ES6+', 'Fetch API', 'DOM APIs', 'LocalStorage']
    }
  },
  {
    id: 3,
    stepNum: '03',
    title: 'TypeScript Transition',
    duration: '5-7 Days',
    category: 'TypeScript',
    icon: Cpu,
    summary: 'Shift to static typing for enterprise-grade codebase reliability and self-documenting code.',
    topics: [
      {
        title: 'Type System Essentials',
        items: ['Primitive types & Type Annotations', 'Interfaces vs Type Aliases', 'Union, Intersection & Tuple types', 'Enums & Literal types']
      },
      {
        title: 'Advanced Typing & Tooling',
        items: ['Generics in functions & interfaces', 'Utility types (Partial, Pick, Omit, Record)', 'Type Guards & Type Assertions', 'tsconfig.json strict mode settings']
      }
    ],
    milestoneProject: {
      title: 'Strict TypeScript Codebase Migration',
      description: 'Refactor Phase 2 JavaScript applications to strict TypeScript with 100% type coverage.',
      tech: ['TypeScript 5+', 'Strict Mode', 'Generics', 'Type Declarations']
    }
  },
  {
    id: 4,
    stepNum: '04',
    title: 'React.js & Modern Ecosystem',
    duration: '30 Days',
    category: 'Frontend',
    icon: Layers,
    summary: 'Build complex, reactive client-side applications with component-driven architecture and server state caching.',
    topics: [
      {
        title: 'React Core Architecture',
        items: ['JSX & Virtual DOM reconciliation', 'Functional components, Props & State', 'Component Lifecycle & Side Effects', 'Controlled vs Uncontrolled inputs']
      },
      {
        title: 'Hooks, State Management & Caching',
        items: ['useState, useEffect, useRef, useContext, useMemo, useCallback', 'Custom reusable React hooks & global state (Redux Toolkit / Zustand)', 'TanStack Query (React Query) server state caching & optimistic UI updates', 'Tailwind CSS & React Router SPA navigation']
      }
    ],
    milestoneProject: {
      title: 'E-Commerce Catalog & Analytics Dashboard',
      description: 'Shopping cart with global state, TanStack Query API caching, real-time filtering, local storage persistence, and interactive charts.',
      tech: ['React 19', 'Tailwind CSS', 'TanStack Query', 'Redux Toolkit/Zustand', 'React Router']
    }
  },
  {
    id: 5,
    stepNum: '05',
    title: 'Modern Backend & Event Streaming (Bun, Hono & Kafka)',
    duration: '20-25 Days',
    category: 'Backend',
    icon: Boxes,
    summary: 'Design high-performance APIs, database indexing, Redis caching, Apache Kafka event streaming, and Typesense search.',
    topics: [
      {
        title: 'Runtime, Layered Architecture & Streaming',
        items: ['Bun high-speed JS/TS runtime & Hono framework routing', 'Layered Architecture (Routes, Controllers, Services)', 'Apache Kafka & RabbitMQ distributed event streaming & message brokers', 'Razorpay & Stripe payment gateway checkout & webhooks']
      },
      {
        title: 'Databases, Indexing & Media Processing',
        items: ['PostgreSQL database design & Prisma ORM schema migrations', 'B-Tree Indexing, Query Optimization & Read/Write Replica splits', 'In-memory API Response Caching with Redis & Typesense search engine', 'Media processing in Node.js (Sharp image optimization & FFmpeg CLI)']
      }
    ],
    milestoneProject: {
      title: 'High-Scale RESTful API, Kafka Stream & Caching',
      description: 'Clean-architecture API backend with PostgreSQL Prisma ORM, Apache Kafka event streaming, Typesense search, and Redis caching.',
      tech: ['Bun', 'Hono', 'PostgreSQL', 'Prisma ORM', 'Apache Kafka', 'Typesense', 'Redis', 'Sharp', 'Razorpay', 'Zod']
    }
  },
  {
    id: 6,
    stepNum: '06',
    title: 'Auth, AI APIs & Cloudflare Edge Pipeline',
    duration: '15 Days',
    category: 'Security',
    icon: ShieldCheck,
    summary: 'Secure endpoints with JWT/OAuth, Cloudflare Workers edge functions, and Groq AI LLM integration.',
    topics: [
      {
        title: 'Authentication & Edge Security',
        items: ['JWT Access & Refresh Token rotation & HttpOnly Cookie management', 'OAuth 2.0 (Google, GitHub logins)', 'Cloudflare Workers Edge Computing & Serverless KV stores', 'reCAPTCHA / Cloudflare Turnstile bot defense & Rate Limiting']
      },
      {
        title: 'AI APIs & Asset Delivery CDNs',
        items: ['Groq AI API & OpenAI SDK prompt engineering & streaming', 'ImageKit & Cloudinary dynamic image optimization', 'AWS S3 & Cloudflare R2 bucket asset storage pipelines', 'Presigned URLs & multi-region CDN delivery']
      }
    ],
    milestoneProject: {
      title: 'Secure Auth, Cloudflare Workers & Groq AI Engine',
      description: 'Authentication backend featuring OAuth social login, Cloudflare Workers edge routing, Groq AI SDK streaming, and Cloudflare R2 media storage.',
      tech: ['JWT', 'OAuth 2.0', 'Groq API', 'Cloudflare Workers', 'Cloudflare R2', 'ImageKit', 'reCAPTCHA']
    }
  },
  {
    id: 7,
    stepNum: '07',
    title: 'Full-Stack Frameworks, Monorepos & System Design',
    duration: '25-30 Days',
    category: 'Fullstack',
    icon: Rocket,
    summary: 'Architect scalable full-stack applications, Turborepo monorepos, tRPC & GraphQL APIs, and microservices system design.',
    topics: [
      {
        title: 'Turborepo & System Design',
        items: ['Turborepo monorepo workspaces & shared package caching', 'System Architecture (Monolith vs Microservices trade-offs)', 'API Gateway pattern, Reverse Proxies & Load Balancing', 'tRPC end-to-end type safety & GraphQL schemas & resolvers']
      },
      {
        title: 'Next.js (App Router)',
        items: ['SSG, SSR, ISR rendering strategies', 'React Server Components (RSC) vs Client Components', 'Server Actions & Serverless / Edge Functions', 'NextAuth / Auth.js integration']
      }
    ],
    milestoneProject: {
      title: 'Full-Stack Turborepo, tRPC & Microservices Platform',
      description: 'Monorepo containing Next.js App Router web app, Hono API Gateway backend, tRPC & GraphQL API layer, shared packages, and ISR rendering.',
      tech: ['Next.js App Router', 'Turborepo', 'tRPC', 'GraphQL', 'Microservices', 'NextAuth', 'Server Actions', 'ISR']
    }
  },
  {
    id: 8,
    stepNum: '08',
    title: 'Real-Time Systems & Bot Automation',
    duration: '15-20 Days',
    category: 'Real-Time',
    icon: Radio,
    summary: 'Build low-latency bidirectional communications, background workers, and automated bots.',
    topics: [
      {
        title: 'Real-Time Protocols & Queues',
        items: ['WebSockets (Native WS / Socket.io) & Heartbeats', 'WebRTC Peer-to-Peer streams & STUN/TURN servers', 'Redis Pub/Sub & BullMQ background task queues']
      },
      {
        title: 'WhatsApp & Telegram Bot Engine',
        items: ['Telegram Bot Creation (Telegraf framework)', 'WhatsApp API / Webhook integration (Baileys SDK)', 'Automated auto-reply engines & message queues']
      }
    ],
    milestoneProject: {
      title: 'Real-Time Workspace & Bot Automation Engine',
      description: 'Multi-user chat application with WebSockets, WebRTC calling, BullMQ queues, and automated Telegram/WhatsApp bots.',
      tech: ['WebSockets', 'WebRTC', 'Telegram Bot', 'WhatsApp API', 'Redis Pub/Sub', 'BullMQ']
    }
  },
  {
    id: 9,
    stepNum: '09',
    title: 'DevOps, CI/CD & Media Transcoding Pipeline',
    duration: '30 Days',
    category: 'DevOps',
    icon: Cloud,
    summary: 'Deploy, scale, monitor, and transcode video with AWS MediaConvert, FFmpeg, and GitHub Actions.',
    topics: [
      {
        title: 'GitHub Actions CI/CD & Containers',
        items: ['GitHub Actions automated CI/CD workflows', 'Automated lint, unit tests & Docker builds', 'Nginx Reverse Proxy, SSL via Certbot & Docker Compose']
      },
      {
        title: 'AWS Cloud, MediaConvert Transcoding & Observability',
        items: ['AWS Elemental MediaConvert & FFmpeg automated HLS/DASH video transcoding', 'AWS IAM principle of least privilege, S3 & CloudFront CDN', 'Cloudflare WAF rules, Edge Security & DDoS mitigation', 'Sentry error tracking & log aggregation']
      }
    ],
    milestoneProject: {
      title: 'Cloud-Native Platform & Video Transcoding Pipeline',
      description: 'Dockerized app with GitHub Actions CI/CD deploying to AWS EC2 with FFmpeg & AWS MediaConvert HLS video pipelines and Sentry monitoring.',
      tech: ['GitHub Actions', 'AWS EC2/S3/CloudFront', 'AWS MediaConvert', 'FFmpeg', 'Docker', 'Nginx', 'Sentry']
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20
    }
  }
};

export default function FullstackRoadmapPage() {
  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Layout title="Full-Stack & DevOps Roadmap | Amber Bisht">
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative">
        
        {/* Header Hero */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-makima-red/10 blur-[100px] rounded-full pointer-events-none" />
          
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-4">
            Full-Stack & DevOps <span className="text-makima-red">Roadmap</span>
          </h1>
        </div>

        {/* Flowchart Pipeline Tree */}
        <div className="relative pl-6 md:pl-10 ml-2 md:ml-4">
          
          {/* Static Background Beam Line */}
          <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-white/10 z-0" />
          
          {/* Animated Scroll Progress Laser Beam */}
          <motion.div 
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-makima-red via-rose-500 to-amber-400 z-10 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
          />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {phases.map((phase) => {
              const PhaseIcon = phase.icon;

              return (
                <motion.div
                  id={`phase-${phase.id}`}
                  key={phase.id}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Flowchart Node Marker Dot on Timeline */}
                  <div className="absolute -left-[31px] md:-left-[47px] top-6 w-6 h-6 md:w-7 md:h-7 rounded-full bg-neutral-950 border-2 border-makima-red flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)] z-20">
                    <div className="w-2 h-2 rounded-full bg-makima-red animate-ping" />
                  </div>

                  {/* Flowchart Node Card Container */}
                  <div className="bg-neutral-900/40 p-6 md:p-8 border border-white/5 hover:border-makima-red/30 rounded-3xl flex flex-col relative overflow-hidden transition-all duration-500 shadow-2xl group-hover:bg-neutral-900/60">
                    
                    {/* Tilted Dull White Background Duration Watermark (Top Right) */}
                    <div className="absolute top-2 right-4 md:right-8 pointer-events-none select-none z-0 transform -rotate-6">
                      <span className="text-6xl md:text-8xl font-mono font-black uppercase text-white/[0.025] group-hover:text-white/[0.05] transition-colors duration-500 tracking-tighter whitespace-nowrap">
                        {phase.duration}
                      </span>
                    </div>

                    {/* Ambient Red Glow Corner Blur */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-makima-red/5 blur-[90px] rounded-full pointer-events-none -mr-20 -mt-20 group-hover:bg-makima-red/15 transition-all duration-500" />

                    <div className="relative z-10">
                      {/* Flow Node Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-4">
                        
                        {/* Left: Icon & Title */}
                        <div className="flex items-center gap-4">
                          <div className="p-3.5 rounded-2xl bg-white/5 border border-makima-red/20 text-makima-red shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                            <PhaseIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                              <span className="text-makima-red font-mono text-xs font-bold uppercase tracking-widest">
                                STEP {phase.stepNum}
                              </span>
                              <span className="text-white/20">•</span>
                              <span className="text-gray-400 font-mono text-xs font-medium">
                                {phase.category}
                              </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-white tracking-wide">
                              {phase.title}
                            </h3>
                          </div>
                        </div>

                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed max-w-4xl text-sm md:text-base">
                        {phase.summary}
                      </p>

                      {/* Merged Topics Grid (Seamless, no inner background boxes) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-b border-white/10 my-6">
                        {phase.topics.map((topic, tIdx) => (
                          <div key={tIdx}>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-makima-red pl-2.5 font-mono flex items-center gap-2">
                              <span className="text-makima-red">├──</span> {topic.title}
                            </h4>
                            <ul className="space-y-2.5 pl-4 border-l border-white/10">
                              {topic.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                                  <span className="text-makima-red font-mono">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Merged Milestone Project Footer (Stack tech stack on 2nd line if long) */}
                      <div className="flex flex-col gap-3 pt-2">
                        <div>
                          <h5 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-makima-red shrink-0" />
                            <span>{phase.milestoneProject.title}</span>
                          </h5>
                          <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">{phase.milestoneProject.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {phase.milestoneProject.tech.map((t, idx) => {
                            const { icon: Icon, color, isFallback } = getTechIcon(t);
                            return (
                              <span key={idx} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs text-gray-300 font-mono flex items-center gap-2 transition-colors">
                                {!isFallback && <Icon style={{ color }} className="text-sm shrink-0" aria-hidden="true" />}
                                <span>{t}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </section>
    </Layout>
  );
}
