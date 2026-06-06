import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Section from '../components/Section';
import data from '../data/data.json';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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

    const slide = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 350;
            const gap = window.innerWidth >= 768 ? 32 : 24; // md:gap-8 is 32px, gap-6 is 24px
            const scrollAmount = cardWidth + gap;

            const { scrollLeft, scrollWidth, clientWidth } = container;

            if (direction === 'right') {
                // Wrap to start if near the end
                if (scrollLeft + clientWidth >= scrollWidth - 15) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            } else {
                // Wrap to end if near the start
                if (scrollLeft <= 15) {
                    container.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
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
                {/* Relative Wrapper for Floating Arrow Buttons */}
                <div className="relative w-full group">
                    {/* Left Floating Button */}
                    <button
                        onClick={() => slide('left')}
                        className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 hover:border-white/20 text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all hover:scale-110 active:scale-95 cursor-pointer md:opacity-0 md:group-hover:opacity-100 duration-300 flex items-center justify-center"
                        aria-label="Slide Left"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    {/* Right Floating Button */}
                    <button
                        onClick={() => slide('right')}
                        className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 hover:border-white/20 text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all hover:scale-110 active:scale-95 cursor-pointer md:opacity-0 md:group-hover:opacity-100 duration-300 flex items-center justify-center"
                        aria-label="Slide Right"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    {/* Horizontal Scrolling Projects List */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-6"
                    >
                        {data.projects
                            .filter(project => project.slug !== "telegram-owner-reply-bot")
                            .map((project, index) => (
                                <div 
                                    key={project.id} 
                                    className="w-[280px] sm:w-[330px] md:w-[350px] shrink-0 snap-start"
                                >
                                    <ProjectCard 
                                        project={project} 
                                        index={index} 
                                        orientation="vertical" 
                                        showTag={false}
                                    />
                                </div>
                            ))}
                    </div>
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

            <Contact data={data} githubStats={githubStats} />
        </Layout >
    );
}
