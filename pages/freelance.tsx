import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import data from '../data/data.json';

const Freelance = () => {
    // 1. Prepare and merge data with tags
    const freelanceProjects = (data.freelance || []).map((p: any) => ({
        ...p,
        tag: p.tag || "Personal Project" // Changed from Freelance Project
    }));

    const personalProjects = (data.projects || []).map(p => ({
        ...p,
        tag: "Personal Project"
    }));

    // Order: Freelance -> Personal
    const allProjects = [...freelanceProjects, ...personalProjects];

    return (
        <Layout title="All Projects | Amber Bisht">
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        All <span className="text-makima-red">Projects</span>
                    </h1>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {allProjects.map((project, index) => (
                        <div key={`${project.title}-${index}`} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 50}ms` }}>
                            {/* @ts-ignore */}
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
};

export default Freelance;
