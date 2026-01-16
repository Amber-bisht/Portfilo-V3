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

            {/* Island Navbar */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <nav className="flex items-center gap-2 p-1.5 bg-zinc-900/90 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.name;
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setActiveTab(item.name)}
                                className={`flex items-center gap-2 rounded-full transition-all duration-300 font-medium ${isActive
                                    ? 'bg-off-white text-black px-4 py-2'
                                    : 'text-white p-3 hover:bg-white/10'
                                    }`}
                                aria-label={item.name}
                            >
                                <item.icon className="text-lg" />
                                {isActive && <span className="whitespace-nowrap">{item.name}</span>}
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
