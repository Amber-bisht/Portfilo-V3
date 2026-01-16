import Head from 'next/head';
import { ReactNode, useState } from 'react';
import { FaHome, FaFolder, FaEnvelope, FaLayerGroup } from 'react-icons/fa';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const Layout = ({ children, title = 'Amber Bisht | DevOps Engineer' }: LayoutProps) => {
    const [activeTab, setActiveTab] = useState('Home');

    const navItems = [
        { name: 'Home', icon: FaHome, href: '#' },
        { name: 'Projects', icon: FaFolder, href: '#projects' },
        { name: 'Tech Stack', icon: FaLayerGroup, href: '#techstack' },
        { name: 'Contact', icon: FaEnvelope, href: '#contact' },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-off-white relative selection:bg-makima-gold selection:text-neutral-950 transition-colors duration-300">
            <Head>
                <title>{title}</title>
                <meta name="description" content="Amber Bisht - DevOps Engineer Portfolio. Building resilient systems and automated pipelines." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="Amber Bisht" />
                <meta name="keywords" content="DevOps, Amber Bisht, Cloud Engineer, AWS, Kubernetes, Terraform, CI/CD" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://amberbisht.me/" />
                <meta property="og:title" content="Amber Bisht | DevOps Engineer" />
                <meta property="og:description" content="DevOps Engineer specializing in AWS, Kubernetes, and automated pipelines. View my portfolio." />
                <meta property="og:image" content="https://amberbisht.me/images/og-image.png" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://amberbisht.me/" />
                <meta property="twitter:title" content="Amber Bisht | DevOps Engineer" />
                <meta property="twitter:description" content="DevOps Engineer specializing in AWS, Kubernetes, and automated pipelines. View my portfolio." />
                <meta property="twitter:image" content="https://amberbisht.me/images/og-image.png" />

                <link rel="canonical" href="https://amberbisht.me/" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Premium Navigator */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-1000">
                <nav className="flex items-center p-1 bg-[#1a1a1a]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.name;
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveTab(item.name);
                                    if (item.href !== '#') {
                                        const element = document.querySelector(item.href);
                                        element?.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                className={`
                                    relative flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                                    ${isActive
                                        ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                        : 'text-white hover:text-white hover:bg-white/5'
                                    }
                                `}
                                aria-label={item.name}
                            >
                                <item.icon className={`text-lg transition-transform duration-300 ${isActive ? 'scale-105' : 'group-hover:scale-110'}`} />
                                <span
                                    className={`
                                        overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] font-medium text-sm
                                        ${isActive ? 'max-w-[200px] opacity-100 ml-1' : 'max-w-0 opacity-0'}
                                    `}
                                >
                                    {item.name}
                                </span>
                            </a>
                        );
                    })}
                </nav>
            </header>

            <main className="relative z-10 pt-16">
                {children}
            </main>

            <footer className="py-8 text-center text-sm text-gray-600 border-t border-makima-red/10">
                <p>&copy; {new Date().getFullYear()} Amber Bisht. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
