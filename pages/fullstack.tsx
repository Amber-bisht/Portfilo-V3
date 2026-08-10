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
  Clock, 
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
    summary: 'Build complex, reactive client-side applications with component-driven architecture.',
    topics: [
      {
        title: 'React Core Architecture',
        items: ['JSX & Virtual DOM reconciliation', 'Functional components, Props & State', 'Component Lifecycle & Side Effects', 'Controlled vs Uncontrolled inputs']
      },
      {
        title: 'Hooks & State Management',
        items: ['useState, useEffect, useRef', 'useContext, useMemo, useCallback', 'Custom reusable React hooks', 'Redux Toolkit / Zustand global state']
      },
      {
        title: 'Styling & Navigation',
        items: ['Tailwind CSS utility-first layout', 'Dynamic theme toggling (Dark mode)', 'React Router SPA navigation']
      }
    ],
    milestoneProject: {
      title: 'E-Commerce Catalog & Analytics Dashboard',
      description: 'Shopping cart with global state, real-time filtering, local storage persistence, and interactive charts.',
      tech: ['React 19', 'Tailwind CSS', 'Redux Toolkit/Zustand', 'React Router']
    }
  },
  {
    id: 5,
    stepNum: '05',
    title: 'Modern Backend Engineering (Bun & Hono)',
    duration: '20-25 Days',
    category: 'Backend',
    icon: Boxes,
    summary: 'Design high-performance, modular RESTful APIs using Bun runtime and Hono framework.',
    topics: [
      {
        title: 'Runtime & Architecture',
        items: ['Bun high-speed JS/TS runtime', 'Hono framework routing & middlewares', 'Layered Architecture (Routes, Controllers, Services)', 'Standardized JSON responses & HTTP codes']
      },
      {
        title: 'Databases & ORMs',
        items: ['PostgreSQL relational database design', 'Prisma ORM & Drizzle ORM schemas', 'MongoDB document store & Mongoose', 'Connection pooling, Indexing & CRUD']
      }
    ],
    milestoneProject: {
      title: 'Enterprise RESTful API Service',
      description: 'Clean-architecture API backend with PostgreSQL, Prisma ORM schema migrations, and request validation.',
      tech: ['Bun', 'Hono', 'PostgreSQL', 'Prisma ORM', 'Zod']
    }
  },
  {
    id: 6,
    stepNum: '06',
    title: 'Auth, Security & Advanced API Scale',
    duration: '15 Days',
    category: 'Security',
    icon: ShieldCheck,
    summary: 'Secure endpoints with JWT/OAuth and implement production query mechanics.',
    topics: [
      {
        title: 'Authentication & Session Architecture',
        items: ['JWT Access & Refresh Token rotation', 'HttpOnly, Secure, SameSite Cookie management', 'OAuth 2.0 (Google, GitHub, Facebook logins)', 'Session-based authentication stores']
      },
      {
        title: 'Security & Query Mechanics',
        items: ['reCAPTCHA / Cloudflare Turnstile bot defense', 'CORS, Rate Limiting & Input Sanitization', 'Cursor & Offset-based Pagination', 'Multi-field Search, Filtering & API Keys']
      }
    ],
    milestoneProject: {
      title: 'Secure Auth & User Management Suite',
      description: 'Authentication backend featuring OAuth social login, HttpOnly JWT cookies, reCAPTCHA, and rate limiting.',
      tech: ['JWT', 'OAuth 2.0', 'reCAPTCHA', 'Rate Limiting', 'Cookies']
    }
  },
  {
    id: 7,
    stepNum: '07',
    title: 'Full-Stack Frameworks & Monorepos',
    duration: '25-30 Days',
    category: 'Fullstack',
    icon: Rocket,
    summary: 'Architect scalable full-stack applications with Next.js App Router and Turborepo monorepos.',
    topics: [
      {
        title: 'Turborepo Monorepos',
        items: ['Workspace configuration & package sharing', 'Shared TypeScript types & UI components', 'Incremental build pipeline caching']
      },
      {
        title: 'Next.js (App Router)',
        items: ['SSG, SSR, ISR rendering strategies', 'React Server Components (RSC) vs Client Components', 'Server Actions & Serverless / Edge Functions', 'NextAuth / Auth.js integration']
      }
    ],
    milestoneProject: {
      title: 'Full-Stack Turborepo Platform',
      description: 'Monorepo containing Next.js App Router web app, Hono API backend, shared types package, and ISR engine.',
      tech: ['Next.js App Router', 'Turborepo', 'NextAuth', 'Server Actions', 'ISR']
    }
  },
  {
    id: 8,
    stepNum: '08',
    title: 'Real-Time Systems & Event-Driven Architecture',
    duration: '15-20 Days',
    category: 'Real-Time',
    icon: Radio,
    summary: 'Build low-latency bidirectional communications and background task queue workers.',
    topics: [
      {
        title: 'Real-Time Protocols',
        items: ['WebSockets (Native WS / Socket.io) & Heartbeats', 'WebRTC Peer-to-Peer streams & STUN/TURN servers', 'WebRTC DataChannels for low-latency messages']
      },
      {
        title: 'Event Broadcasting & Queues',
        items: ['Redis Pub/Sub multi-node message fanout', 'BullMQ / RabbitMQ background task queues', 'Worker pool thread isolation']
      }
    ],
    milestoneProject: {
      title: 'Real-Time Collaborative Workspace',
      description: 'Multi-user chat application with WebSockets, WebRTC audio/video calling, and BullMQ background task processing.',
      tech: ['WebSockets', 'WebRTC', 'Redis Pub/Sub', 'BullMQ', 'Socket.io']
    }
  },
  {
    id: 9,
    stepNum: '09',
    title: 'DevOps, Cloud Infrastructure & Observability',
    duration: '30 Days',
    category: 'DevOps',
    icon: Cloud,
    summary: 'Deploy, scale, monitor, and automate applications in AWS cloud environments.',
    topics: [
      {
        title: 'Linux & Containerization',
        items: ['Bash scripting, SSH keys, cron jobs', 'Nginx Reverse Proxy & SSL via Certbot', 'Docker multi-stage builds & Docker Compose']
      },
      {
        title: 'AWS Cloud Services & Monitoring',
        items: ['IAM roles, S3 storage & CloudFront CDN', 'AWS Lambda serverless & MediaConvert video encoding', 'Amazon RDS PostgreSQL & Auto Scaling Groups (ASG)', 'Sentry error tracking & log aggregation']
      }
    ],
    milestoneProject: {
      title: 'Cloud-Native Media Platform',
      description: 'Dockerized app deployed on AWS EC2 with Nginx, S3 + CloudFront video transcode pipeline via MediaConvert, ASG scaling, and Sentry monitoring.',
      tech: ['AWS EC2/S3/CloudFront', 'AWS Lambda/MediaConvert', 'Docker', 'Nginx', 'Sentry']
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
          
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-white mb-6">
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
                  {/* Flowchart Node Marker Dot with Step Number Badge on Timeline */}
                  <div className="absolute -left-[31px] md:-left-[47px] top-6 w-6 h-6 md:w-7 md:h-7 rounded-full bg-neutral-950 border-2 border-makima-red flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)] z-20">
                    <div className="w-2 h-2 rounded-full bg-makima-red animate-ping" />
                  </div>

                  {/* Flowchart Node Card Container */}
                  <div className="bg-neutral-900/50 p-6 md:p-8 border border-white/5 hover:border-white/10 rounded-3xl flex flex-col relative overflow-hidden transition-all duration-300 shadow-xl">
                    
                    {/* Top Right Floating Step Badge */}
                    <div className="absolute top-6 right-6 hidden md:flex items-center gap-2">
                      <span className="text-makima-red font-mono text-xs font-bold uppercase tracking-widest bg-makima-red/10 px-3 py-1 rounded-full border border-makima-red/30 shadow-[0_0_12px_rgba(239,68,68,0.2)]">
                        STEP {phase.stepNum}
                      </span>
                    </div>

                    <div className="absolute top-0 right-0 w-64 h-64 bg-makima-red/5 blur-[80px] rounded-full pointer-events-none -mr-16 -mt-16" />

                    <div className="relative z-10">
                      {/* Flow Node Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 pr-0 md:pr-24">
                        <div className="flex items-center gap-4">
                          {/* FIXED Icon box */}
                          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-makima-red shrink-0">
                            <PhaseIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-makima-red md:hidden font-bold text-xs font-mono uppercase tracking-wider bg-makima-red/10 px-2 py-0.5 rounded-full border border-makima-red/20">
                                STEP {phase.stepNum}
                              </span>
                              <span className="text-gray-400 font-mono text-xs bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-makima-red" />
                                {phase.duration}
                              </span>
                            </div>
                            <h3 className="text-2xl font-cinzel font-bold text-white">
                              <span className="text-makima-red font-mono mr-2.5 text-xl font-bold">{phase.stepNum}.</span>
                              {phase.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed max-w-4xl text-sm md:text-base">
                        {phase.summary}
                      </p>

                      {/* Details Content Always Rendered */}
                      <div>
                        {/* Topics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pt-2">
                          {phase.topics.map((topic, tIdx) => (
                            <div key={tIdx} className="bg-black/20 p-5 rounded-2xl border border-white/5">
                              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-makima-red pl-2.5 font-mono flex items-center gap-2">
                                <span>├──</span> {topic.title}
                              </h4>
                              <ul className="space-y-2.5 pl-4 border-l border-white/5">
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

                        {/* Milestone Project */}
                        <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-mono text-makima-red font-bold uppercase tracking-wider mb-1">
                              <Rocket className="w-3.5 h-3.5" /> Milestone Project Node
                            </div>
                            <h5 className="text-base font-bold text-white mb-1">{phase.milestoneProject.title}</h5>
                            <p className="text-xs text-gray-400">{phase.milestoneProject.description}</p>
                          </div>

                          <div className="flex flex-wrap gap-2 shrink-0">
                            {phase.milestoneProject.tech.map((t, idx) => {
                              const { icon: Icon, color, isFallback } = getTechIcon(t);
                              return (
                                <span key={idx} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-xs text-gray-300 font-mono flex items-center gap-2 transition-colors">
                                  {!isFallback && <Icon style={{ color }} className="text-sm shrink-0" aria-hidden="true" />}
                                  <span>{t}</span>
                                </span>
                              );
                            })}
                          </div>
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
