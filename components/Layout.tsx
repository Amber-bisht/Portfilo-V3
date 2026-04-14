import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState, useEffect } from 'react';
import { FaHome, FaFolder, FaEnvelope, FaLayerGroup, FaBriefcase, FaLinkedin, FaGithub, FaTwitter, FaMusic, FaPause } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import data from '../data/data.json';
import ParticlesBg from './ParticlesBg';
import { Navbar, NavBody, NavItems, NavbarLogo, NavbarButton, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle } from './Navbar';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const Layout = ({ children, title = 'Amber Bisht | Full Stack Developer and DevOps' }: LayoutProps) => {
    const { isCinematicMode } = useTheme();
    const [isPlaying, setIsPlaying] = useState(false);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Sync with global music status
    useEffect(() => {
        const handleStatusUpdate = (e: any) => {
            setIsPlaying(e.detail.isPlaying);
        };
        window.addEventListener('music-status-update', handleStatusUpdate);
        return () => window.removeEventListener('music-status-update', handleStatusUpdate);
    }, []);

    const toggleMusic = () => {
        const action = isPlaying ? 'pause' : 'play';
        window.dispatchEvent(new CustomEvent('music-command', { detail: { action } }));
    };

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

            {/* Layered Atmospheric Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                {/* Base Layer */}
                <div className="absolute inset-0 bg-neutral-950" />




                {/* Vertical Scanline Beam */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-transparent via-red-500/5 to-transparent animate-scanline z-[5]" />

                {/* Structural Grid */}
                <div className="absolute inset-0 bg-grid-pattern opacity-100" />

                {/* Cinematic Noise */}
                <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay" />

                {/* Gradient Fades */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
            </div>

            <ParticlesBg />

            {/* Cinematic Theme Pillar Backgrounds - Continuous Aesthetic Frame */}
            {isCinematicMode && (
                <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 w-[200px] opacity-[0.12] transition-opacity duration-1000"
                        style={{
                            backgroundImage: 'url(/pillars_seamless.png)',
                            backgroundSize: '100% auto',
                            backgroundRepeat: 'repeat-y',
                            backgroundPosition: 'top left'
                        }}
                    />
                    <div
                        className="absolute inset-y-0 right-0 w-[200px] opacity-[0.12] transition-opacity duration-1000"
                        style={{
                            backgroundImage: 'url(/pillars_seamless.png)',
                            backgroundSize: '100% auto',
                            backgroundRepeat: 'repeat-y',
                            backgroundPosition: 'top right'
                        }}
                    />
                </div>
            )}


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
                    <div className="flex items-center gap-4 relative">
                        <div className="relative group">
                            <NavbarButton href="mailto:bishtamber0@gmail.com" variant="hireme">
                                Hire Me
                            </NavbarButton>

                            {/* Navbar Decorative Lantern - Hanging under Hire Me */}
                            {isCinematicMode && (
                                <div className="absolute top-[95%] left-1/2 -translate-x-1/2 w-16 h-40 md:w-20 md:h-48 opacity-95 pointer-events-none transition-all duration-700 -mt-8">
                                    <Image
                                        src="/lattern.png"
                                        alt="Decorative Lantern"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </div>
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

            <footer className="relative z-10 border-t border-white/10 pt-16 pb-8 px-4 md:px-8 mt-20 bg-black/20 backdrop-blur-md overflow-hidden">
                {/* Footer Background Image */}
                {isCinematicMode && (
                    <div className="absolute inset-0 z-[-1] opacity-100 pointer-events-none transition-opacity duration-700">
                        <Image
                            src="/reze.png"
                            alt="Footer Background"
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                    </div>
                )}

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
                    {/* Column 1: Branding */}
                    <div className="md:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-white tracking-tighter uppercase mb-4 block">
                            Amber Bisht
                        </Link>
                        <p className="text-white/90 max-w-sm mb-6 text-sm leading-relaxed">
                            Full Stack Developer and DevOps Engineer specializing in building redundant systems and automated pipelines with precision and performance.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
                                <FaLinkedin size={20} />
                            </a>
                            <a href={data.contact.twitter} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
                                <FaTwitter size={20} />
                            </a>
                            <a href={data.contact.github} target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
                                <FaGithub size={20} />
                            </a>
                            <a href={`mailto:${data.contact.email}`} className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110">
                                <SiGmail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Navigation */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6 px-2 border-l-2 border-red-600">Navigation</h4>
                        <ul className="space-y-3">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-white/80 hover:text-white transition-colors text-xs uppercase tracking-wider">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6 px-2 border-l-2 border-red-600">Contact</h4>
                        <ul className="space-y-4 text-xs font-mono">
                            <li className="text-white/90">
                                <span className="block text-white font-bold mb-1 uppercase tracking-tighter">Email</span>
                                <a href={`mailto:${data.contact.email}`} className="text-white hover:text-red-400 transition-colors break-all">
                                    {data.contact.email}
                                </a>
                            </li>
                            <li className="text-white/90">
                                <span className="block text-white font-bold mb-1 uppercase tracking-tighter">Availability</span>
                                <span className="text-green-500 animate-pulse">●</span> Open for Freelance
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-mono text-white/50">
                    <p>
                        &copy; {new Date().getFullYear()} Amber Bisht
                    </p>
                </div>
            </footer>

            {/* Global Music Aside Toggle */}
            <button
                onClick={toggleMusic}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] group flex items-center"
            >
                <div className={`flex flex-col items-center gap-4 py-8 px-2 rounded-l-2xl border-y border-l transition-all duration-500 backdrop-blur-xl ${isPlaying ? 'bg-makima-red/20 border-makima-red/30 text-white shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'}`}>
                    <div className="flex flex-col gap-1 items-center">
                        {isPlaying ? (
                            <div className="flex flex-col gap-0.5 items-center">
                                <div className="w-1 h-3 bg-white rounded-full animate-music-bar-1" />
                                <div className="w-1 h-5 bg-white rounded-full animate-music-bar-2" />
                                <div className="w-1 h-2 bg-white rounded-full animate-music-bar-3" />
                            </div>
                        ) : (
                            <FaMusic size={14} className="opacity-50" />
                        )}
                    </div>

                    <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">
                        {isPlaying ? 'Playing' : 'Music'}
                    </span>

                    {isPlaying && (
                        <div className="mt-2 text-white/80 scale-75">
                            <FaPause size={12} />
                        </div>
                    )}
                </div>
            </button>
        </div>
    );
};

export default Layout;
