import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Section from '../components/Section';
import data from '../data/data.json';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ── Premium section heading ──────────────────────────────────────────────────
function SectionHeading({ num, title, sub }: { num: string; title: string; sub?: string }) {
    return (
        <div className="mb-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">
                {title}
            </h2>
            {sub && (
                <p className="mt-3 text-white/40 text-sm md:text-base max-w-xl">{sub}</p>
            )}
        </div>
    );
}

const ProjectCard = dynamic(() => import('../components/ProjectCard'));
const Experience = dynamic(() => import('../components/Experience'));
const TechStack = dynamic(() => import('../components/TechStack'));
const Contact = dynamic(() => import('../components/Contact'));

export const getStaticProps = async () => {
    try {
        const githubUsername = data.contact.github.replace('https://github.com/', '');
        const statsRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        const statsData = await statsRes.json();

        const calendarRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`);
        const calendarData = await calendarRes.json();

        return {
            props: {
                githubStats: {
                    repos: statsData.public_repos || data.about.fallbackRepos,
                    followers: statsData.followers || data.about.fallbackFollowers,
                    topLang: data.about.topLang,
                    calendarData: calendarData.contributions || []
                }
            },
            revalidate: 3600
        };
    } catch (e) {
        return {
            props: {
                githubStats: {
                    repos: data.about.fallbackRepos,
                    followers: data.about.fallbackFollowers,
                    topLang: data.about.topLang,
                    calendarData: []
                }
            },
            revalidate: 3600
        };
    }
}

export default function Home({ githubStats }: { githubStats: any }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    // Track ongoing animation frame so rapid clicks don't stack up
    const animFrameRef = useRef<number | null>(null);
    const isWarpingRef = useRef(false);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Center on middle set after render
        const initScroll = () => {
            const oneSetWidth = container.scrollWidth / 3;
            if (oneSetWidth > 0) {
                // Direct assignment — no scroll event triggered, no CSS smooth
                container.scrollLeft = oneSetWidth;
            }
        };

        const timer = setTimeout(initScroll, 80);
        window.addEventListener('resize', initScroll);

        // The warp listener — fires during user drag / touch scroll
        const handleScroll = () => {
            if (isWarpingRef.current) return;
            const { scrollLeft, scrollWidth } = container;
            const oneSetWidth = scrollWidth / 3;
            if (oneSetWidth === 0) return;

            if (scrollLeft >= oneSetWidth * 2) {
                isWarpingRef.current = true;
                container.scrollLeft = scrollLeft - oneSetWidth;
                isWarpingRef.current = false;
            } else if (scrollLeft < oneSetWidth) {
                isWarpingRef.current = true;
                container.scrollLeft = scrollLeft + oneSetWidth;
                isWarpingRef.current = false;
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            container.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', initScroll);
            clearTimeout(timer);
        };
    }, []);

    // Manual eased scroll — bypasses CSS scroll-smooth so we can warp mid-animation
    const slide = useCallback((direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (!container) return;

        if (animFrameRef.current !== null) {
            cancelAnimationFrame(animFrameRef.current);
        }

        const cardEl = container.firstElementChild as HTMLElement | null;
        const cardWidth = cardEl?.offsetWidth || 350;
        const gap = window.innerWidth >= 768 ? 32 : 24;
        const scrollAmount = cardWidth + gap;
        const delta = direction === 'right' ? scrollAmount : -scrollAmount;

        const start = container.scrollLeft;
        const target = start + delta;
        const duration = 420; // ms
        const startTime = performance.now();

        const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOut(progress);

            const oneSetWidth = container.scrollWidth / 3;

            // Compute raw target position then warp if it crosses a boundary
            let newScrollLeft = start + eased * delta;

            // Apply warp mid-animation so it stays within middle set zone
            if (oneSetWidth > 0) {
                if (newScrollLeft >= oneSetWidth * 2) {
                    newScrollLeft -= oneSetWidth;
                    // Reset start reference to new warped origin
                } else if (newScrollLeft < oneSetWidth) {
                    newScrollLeft += oneSetWidth;
                }
            }

            isWarpingRef.current = true;
            container.scrollLeft = newScrollLeft;
            isWarpingRef.current = false;

            if (progress < 1) {
                animFrameRef.current = requestAnimationFrame(step);
            } else {
                animFrameRef.current = null;
            }
        };

        animFrameRef.current = requestAnimationFrame(step);
    }, []);

    const hiddenSlugs = new Set((data as any).settings?.hiddenSlugs ?? []);
    const projects = data.projects.filter(p => !hiddenSlugs.has(p.slug));

    return (
        <Layout>
            <Hero data={data} />

            <div id="about" />

            <section id="experience" className="relative py-10 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionHeading num="01" title={data.sections.experience.title} sub={data.sections.experience.subtitle} />
                <Experience experiences={data.experience} />
            </section>

            <Section id="techstack" className="py-10">
                <SectionHeading num="02" title={data.sections.techStack.title} sub={data.sections.techStack.subtitle} />
                <TechStack data={data.techStack} />
            </Section>

            <Section id="projects" className="py-10">
                <SectionHeading num="03" title={data.sections.projects.title} sub={data.sections.projects.subtitle} />
                <div className="relative group/carousel">
                    {/* Left Scroll Button */}
                    <button
                        onClick={() => slide('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-neutral-900/90 hover:bg-neutral-800 text-white p-3 rounded-full border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hidden md:flex items-center justify-center md:opacity-0 md:group-hover/carousel:opacity-100"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Horizontal Scrolling Projects List — NO scroll-smooth, NO snap (needed for instant warp) */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-6"
                        style={{ scrollBehavior: 'auto' }}
                    >
                        {/* Triple-cloned sets for seamless infinite loop */}
                        {[0, 1, 2].flatMap((setIndex) =>
                            projects.map((project, index) => (
                                <div
                                    key={`${project.id}-${setIndex}`}
                                    className="w-[280px] sm:w-[330px] md:w-[350px] shrink-0"
                                >
                                    <ProjectCard
                                        project={project}
                                        index={index}
                                        orientation="vertical"
                                        showTag={false}
                                    />
                                </div>
                            ))
                        )}
                    </div>

                    {/* Right Scroll Button */}
                    <button
                        onClick={() => slide('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-neutral-900/90 hover:bg-neutral-800 text-white p-3 rounded-full border border-white/10 backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hidden md:flex items-center justify-center md:opacity-0 md:group-hover/carousel:opacity-100"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* View More Button */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/freelance"
                        className="px-8 py-3 bg-neutral-900/50 hover:bg-neutral-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 group border border-white/5 hover:border-white/10 shadow-lg"
                    >
                        View Freelance Projects
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </Section>

            <section id="contact" className="relative py-10 px-6 md:px-12 max-w-7xl mx-auto">
                <SectionHeading num="04" title={data.sections.contact.title} sub={data.sections.contact.subtitle} />
                <Contact data={data} githubStats={githubStats} />
            </section>
        </Layout>
    );
}
