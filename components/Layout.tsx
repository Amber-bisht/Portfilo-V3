
import Head from 'next/head';
import { ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

const Layout = ({ children, title = 'Amber Bisht | DevOps Engineer' }: LayoutProps) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMouse = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMouse);
        return () => window.removeEventListener('mousemove', updateMouse);
    }, []);

    return (
        <div className="min-h-screen bg-off-white dark:bg-charcoal-dark text-charcoal-dark dark:text-off-white relative selection:bg-makima-gold selection:text-charcoal-dark transition-colors duration-300">
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
                <meta property="twitter:description" content="DevOps Engineer specializing in AWS, Kubernetes, and automated pipelines." />
                <meta property="twitter:image" content="https://amberbisht.me/images/og-image.png" />

                <link rel="canonical" href="https://amberbisht.me/" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-makima-red z-50 origin-left"
                style={{ scaleX }}
            />

            {/* Custom Cursor Follower (Subtle red glow) */}
            <motion.div
                className="fixed top-0 left-0 w-[400px] h-[400px] bg-makima-red/5 rounded-full pointer-events-none blur-3xl z-0 mix-blend-multiply"
                animate={{
                    x: mousePosition.x - 200,
                    y: mousePosition.y - 200,
                }}
                transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
            />

            {/* Global Background Pattern */}
            <div className="fixed inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" style={{ backgroundBlendMode: 'overlay' }} />

            {/* Navbar */}
            <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-charcoal-light/10 dark:border-white/10 bg-off-white/80 dark:bg-charcoal-dark/80 z-40 backdrop-blur-md transition-colors duration-300">
                <div className="px-6 h-16 flex items-center justify-between">
                    <div className="text-xl font-serif font-bold tracking-widest text-makima-red">
                        AMBER BISHT -
                    </div>
                    <div className="flex items-center gap-8">
                        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide dark:text-gray-300">
                            <a href="#about" className="hover:text-makima-red transition-colors">About</a>
                            <a href="#experience" className="hover:text-makima-red transition-colors">Experience</a>
                            <a href="#projects" className="hover:text-makima-red transition-colors">Projects</a>
                            <a href="#contact" className="hover:text-makima-red transition-colors">Contact</a>
                        </nav>
                        <ThemeToggle />
                    </div>
                </div>
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
