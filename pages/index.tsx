import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Section from '../components/Section';
import data from '../data/data.json';
import dynamic from 'next/dynamic';
import Link from 'next/link';

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
    return (
        <Layout>
            <Hero data={data} />

            <div id="about" />

            <Experience experiences={data.experience} />

            <Section id="techstack">
                <TechStack data={data.techStack} />
            </Section>

            <Section id="projects">
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 md:gap-8">
                    {/* Project 1 - Wide */}
                    <div className="md:col-span-2 md:row-span-1">
                        <ProjectCard project={data.projects[0]} index={0} orientation="horizontal" />
                    </div>

                    {/* Project 3 - Tall (Special placement) */}
                    <div className="md:col-span-1 md:row-span-2 h-full">
                        <ProjectCard project={data.projects[2]} index={2} orientation="vertical" />
                    </div>

                    {/* Project 2 - Wide */}
                    <div className="md:col-span-2 md:row-span-1">
                        <ProjectCard project={data.projects[1]} index={1} orientation="horizontal" />
                    </div>
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
