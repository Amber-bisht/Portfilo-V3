import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Section from '../components/Section';
import data from '../data/data.json';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ProjectCard = dynamic(() => import('../components/ProjectCard'));
const Experience = dynamic(() => import('../components/Experience'));
const TechStack = dynamic(() => import('../components/TechStack'));
const Contact = dynamic(() => import('../components/Contact'));

export const getStaticProps = async () => {
    try {
        const statsRes = await fetch('https://api.github.com/users/amber-bisht');
        const statsData = await statsRes.json();

        const calendarRes = await fetch('https://github-contributions-api.jogruber.de/v4/amber-bisht?y=last');
        const calendarData = await calendarRes.json();

        return {
            props: {
                githubStats: {
                    repos: statsData.public_repos || 33,
                    followers: statsData.followers || 5,
                    topLang: "TypeScript",
                    calendarData: calendarData.contributions || []
                }
            },
            revalidate: 3600
        };
    } catch (e) {
        return {
            props: {
                githubStats: {
                    repos: 33,
                    followers: 5,
                    topLang: "TypeScript",
                    calendarData: []
                }
            },
            revalidate: 3600
        };
    }
}

export default function Home({ githubStats }: { githubStats: any }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const slideLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -440, behavior: 'smooth' });
        }
    };

    const slideRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 440, behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <Hero data={data} />

            <div id="about" />

            <Experience experiences={data.experience} />

            <Section id="techstack">
                <TechStack data={data.techStack} />
            </Section>

            <Section id="projects">
                {/* Section Header with Slider Controls */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">
                            Personal <span className="text-makima-red">Projects</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={slideLeft}
                            className="p-3 rounded-full bg-neutral-900/50 hover:bg-neutral-800 border border-white/5 hover:border-white/10 text-white/60 hover:text-white transition-all active:scale-95 cursor-pointer shadow-lg"
                            aria-label="Slide Left"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={slideRight}
                            className="p-3 rounded-full bg-neutral-900/50 hover:bg-neutral-800 border border-white/5 hover:border-white/10 text-white/60 hover:text-white transition-all active:scale-95 cursor-pointer shadow-lg"
                            aria-label="Slide Right"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scrolling Projects List */}
                <div 
                    ref={scrollContainerRef}
                    className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-6"
                >
                    {data.projects
                        .filter(project => project.slug !== "telegram-owner-reply-bot")
                        .map((project, index) => (
                            <div key={project.id} className="w-[300px] sm:w-[380px] md:w-[420px] shrink-0 snap-start">
                                <ProjectCard project={project} index={index} orientation="vertical" />
                            </div>
                        ))}
                </div>

                {/* View More Button */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/freelance"
                        className="px-8 py-3 bg-neutral-900/50 hover:bg-neutral-800 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 group border border-white/5 hover:border-white/10 shadow-lg"
                    >
                        View More Projects
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </Section>

            <Contact data={data} githubStats={githubStats} />
        </Layout >
    );
}
