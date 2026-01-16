import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import data from '../data/data.json';

const Freelance = () => {
    return (
        <Layout title="Freelance Work | Amber Bisht">
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        Freelancing, DevOps & <span className="text-makima-red">Personal Projects</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Showcasing my work in Freelance DevOps, Full Stack Development, and Personal Full Stack Projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {data.freelance.map((project, index) => (
                        <div key={project.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
};

export default Freelance;
