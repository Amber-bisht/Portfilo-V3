import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';
import Experience from '../components/Experience';
import TechStack from '../components/TechStack';
import data from '../data/data.json';
import { motion } from 'framer-motion';

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

            <Section id="contact" className="text-center pb-32">
                <h2 className="text-4xl font-serif font-bold mb-8">
                    Establish Connection
                </h2>
                <p className="mb-8">
                    Are you ready to make a contract?
                </p>
                <div className="flex justify-center">
                    <a
                        href={`mailto:${data.contact.email}`}
                        className="inline-block bg-makima-red font-serif font-bold py-4 px-12 text-lg tracking-widest border border-transparent hover:bg-transparent hover:text-makima-red hover:border-makima-red transition-all duration-300 clip-path-polygon"
                    >
                        CONTACT
                    </a>
                </div>
            </Section>
        </Layout >
    );
}
