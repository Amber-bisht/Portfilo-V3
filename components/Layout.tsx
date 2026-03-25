import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { FaHome, FaFolder, FaEnvelope, FaLayerGroup, FaBriefcase } from 'react-icons/fa';
import ParticlesBg from './ParticlesBg';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const Layout = ({ children, title = 'Amber Bisht | Full Stack Developer and DevOps' }: LayoutProps) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Home');

    const navItems = [
        { name: 'Home', icon: FaHome, href: '/#' },
        { name: 'Projects', icon: FaFolder, href: '/#projects' },
        { name: 'Blog', icon: FaLayerGroup, href: '/blog' },
        { name: 'Freelance', icon: FaBriefcase, href: '/freelance' },
        { name: 'Tech Stack', icon: FaLayerGroup, href: '/#techstack' },
        { name: 'Contact', icon: FaEnvelope, href: '/#contact' },
    ];

    // Helper to determine if a link is active
    const isLinkActive = (itemHref: string) => {
        if (itemHref === '/freelance' && router.pathname === '/freelance') return true;
        if (itemHref === '/blog' && (router.pathname === '/blog' || router.pathname.startsWith('/blog/'))) return true;
        if (itemHref.startsWith('/#') && router.pathname === '/' && activeTab === itemHref.replace('/#', '')) return true; // Approximation
        if (itemHref === '/#' && router.pathname === '/' && activeTab === 'Home') return true;
        return false;
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-off-white relative selection:bg-makima-gold selection:text-neutral-950 transition-colors duration-300">
            <ParticlesBg />
            <Head>
                <title>{title}</title>
                <meta name="description" content="Amber Bisht - Full Stack Developer and DevOps Portfolio. Building resilient systems and automated pipelines." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="Amber Bisht" />
                <meta name="keywords" content="DevOps, Amber Bisht, Cloud Engineer, AWS, Kubernetes, Terraform, CI/CD" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://amberbisht.me/" />
                <meta property="og:title" content="Amber Bisht | Full Stack Developer and DevOps" />
                <meta property="og:description" content="Full Stack Developer and DevOps specializing in AWS, Kubernetes, and automated pipelines. View my portfolio." />
                <meta property="og:image" content="https://amberbisht.me/images/og-image.png" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://amberbisht.me/" />
                <meta property="twitter:title" content="Amber Bisht | Full Stack Developer and DevOps" />
                <meta property="twitter:description" content="Full Stack Developer and DevOps specializing in AWS, Kubernetes, and automated pipelines. View my portfolio." />
                <meta property="twitter:image" content="https://amberbisht.me/images/og-image.png" />

                <link rel="canonical" href="https://amberbisht.me/" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Premium Navigator */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-1000 w-full max-w-fit px-4">
                <nav className="flex items-center justify-center p-1 bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
                    {navItems.map((item) => {
                        const isActive = isLinkActive(item.href) || (activeTab === item.name && router.pathname === '/');

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e: any) => {
                                    if (item.href.startsWith('/#')) {
                                        const hash = item.href.replace('/', '');
                                        if (router.pathname === '/') {
                                            e.preventDefault();
                                            setActiveTab(item.name);
                                            if (hash !== '#') {
                                                const element = document.querySelector(hash);
                                                element?.scrollIntoView({ behavior: 'smooth' });
                                            } else {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }
                                    } else {
                                        setActiveTab(item.name);
                                    }
                                }}
                                className={`
                                    relative flex items-center justify-center gap-2 px-3.5 md:px-5 py-2.5 rounded-full transition-all duration-500 ease-out group
                                    ${isActive
                                        ? 'bg-neutral-100 text-neutral-950 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                                aria-label={item.name}
                            >
                                <item.icon className={`text-lg md:text-xl transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:text-white'}`} />
                                <span
                                    className={`
                                        hidden md:flex overflow-hidden whitespace-nowrap transition-all duration-500 ease-out font-medium text-xs uppercase tracking-widest
                                        ${isActive ? 'max-w-[150px] opacity-100 ml-2' : 'max-w-0 opacity-0'}
                                    `}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </header>

            <main className="relative z-10 pt-8">
                {children}
            </main>

            <footer className="py-8 text-center text-sm text-gray-400 border-t border-makima-red/10">
                <p>&copy; {new Date().getFullYear()} Amber Bisht. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
