import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

interface ProjectProps {
    project: {
        id: number;
        title: string;
        description: string;
        technologies: string[];
    };
    index: number;
}

const ProjectCard = ({ project, index }: ProjectProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-off-white dark:bg-charcoal-dark border border-charcoal-light/10 dark:border-white/10 p-6 md:p-8 hover:border-makima-red/50 transition-colors duration-300 shadow-md"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-makima-red to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-serif group-hover:text-makima-red transition-colors">
                    {project.title}
                </h3>
                <FaCode className="text-makima-red/50 text-xl" />
            </div>

            <p className="mb-6 leading-relaxed text-sm md:text-base">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech) => (
                    <span
                        key={tech}
                        className="text-xs font-mono px-2 py-1 bg-charcoal-light/5 text-makima-red border border-makima-red/20 rounded"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
