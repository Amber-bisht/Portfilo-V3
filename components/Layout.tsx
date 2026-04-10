import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { FaHome, FaFolder, FaEnvelope, FaLayerGroup, FaBriefcase } from 'react-icons/fa';
import ParticlesBg from './ParticlesBg';
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle } from './Navbar';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const Layout = ({ children, title = 'Amber Bisht | Full Stack Developer and DevOps' }: LayoutProps) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', icon: FaHome, href: '/#' },
        { name: 'Projects', icon: FaFolder, href: '/#projects' },
        { name: 'Blog', icon: FaLayerGroup, href: '/blog' },
        { name: 'Freelance', icon: FaBriefcase, href: '/freelance' },
        { name: 'Tech Stack', icon: FaLayerGroup, href: '/#techstack' },
        { name: 'Contact', icon: FaEnvelope, href: '/#contact' },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-off-white relative selection:bg-makima-gold selection:text-neutral-950 transition-colors duration-300 overflow-x-hidden w-full max-w-[100vw]">
            <ParticlesBg />
            <Head>
                <title>{title}</title>
                <meta name="description" content="Amber Bisht - Full Stack Developer and DevOps Portfolio. Building resilient systems and automated pipelines." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="Amber Bisht" />
                <meta name="keywords" content="DevOps, Amber Bisht, Cloud Engineer, AWS, Kubernetes, Terraform, CI/CD" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://amberbisht.me/" />
                <meta property="og:title" content="Amber Bisht | Full Stack Developer and DevOps" />
                <meta property="og:description" content="Full Stack Developer and DevOps specializing in AWS, Kubernetes, and automated pipelines. View my portfolio." />
                <meta property="og:image" content="https://amberbisht.me/images/og-image.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://amberbisht.me/" />
                <meta property="twitter:title" content="Amber Bisht | Full Stack Developer and DevOps" />
                <meta property="twitter:description" content="Full Stack Developer and DevOps specializing in AWS, Kubernetes, and automated pipelines. View my portfolio." />
                <meta property="twitter:image" content="https://amberbisht.me/images/og-image.png" />
                <link rel="canonical" href="https://amberbisht.me/" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Dynamic Precision Navbar */}
            <Navbar>
                {/* Desktop View */}
                <NavBody visible={false}>
                    <NavbarLogo visible={false} />
                    <NavItems 
                        items={navItems.map(item => ({ name: item.name, link: item.href }))} 
                        onItemClick={() => setIsMenuOpen(false)}
                    />
                    <div className="flex items-center gap-4">
                        <NavbarButton href="mailto:bishtamber0@gmail.com" variant="primary">
                            Hire Me
                        </NavbarButton>
                    </div>
                </NavBody>

                {/* Mobile View */}
                <MobileNav visible={false}>
                    <MobileNavHeader>
                        <NavbarLogo visible={false} />
                        <MobileNavToggle 
                            isOpen={isMenuOpen} 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        />
                    </MobileNavHeader>
                    <MobileNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                        <div className="flex flex-col gap-6 w-full py-4 text-center items-center">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => {
                                        setActiveTab(item.name);
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-2xl font-bold text-white hover:text-zinc-400 transition-colors uppercase tracking-widest"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>

            <main className="relative z-10 pt-12 md:pt-16">
                {children}
            </main>

            <footer className="py-8 text-center text-sm text-gray-400 border-t border-white/5">
                <p>&copy; {new Date().getFullYear()} Amber Bisht. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
