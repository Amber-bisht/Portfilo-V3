import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Section from '../components/Section';
import data from '../data/data.json';
import dynamic from 'next/dynamic';

const ProjectCard = dynamic(() => import('../components/ProjectCard'));
const Experience = dynamic(() => import('../components/Experience'));
const TechStack = dynamic(() => import('../components/TechStack'));
const Contact = dynamic(() => import('../components/Contact'));

export default function Home() {
    return (
        <Layout>
            <Hero data={data} />

            <div id="about" />

            <Section id="experience">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 text-right text-makima-red border-r-4 border-makima-red pr-6">
                    Operations
                </h2>
                <div className="space-y-12 max-w-4xl mx-auto">
                    {/* Mapping experience array */}
                    {data.experience.map((exp) => (
                        <Experience key={exp.id} exp={exp} />
                    ))}
                </div>
            </Section>

            <Section id="techstack">
                <TechStack data={data.techStack} />
            </Section>

            <Section id="projects">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 text-left border-l-4 border-makima-red pl-6">
                    Arsenal
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </Section>

            <Contact data={data} />
        </Layout >
    );
}
