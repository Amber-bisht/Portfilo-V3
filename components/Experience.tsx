import { motion } from 'framer-motion';

const Experience = ({ exp }: { exp: any }) => {
    return (
        <div className="relative border-l-2 border-makima-red/20 ml-4 md:ml-8 pl-8 py-4">
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-off-white dark:bg-charcoal-dark border-2 border-makima-red"
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-bold capitalize">{exp.title}</h3>
                <span className="text-makima-red font-serif text-sm">{exp.starttime} - {exp.endtime}</span>
            </div>

            <h4 className="text-makima-red/80 font-medium mb-4 capitalize">{exp.company}</h4>

            <p className="mb-4 max-w-3xl">
                {exp.description}
            </p>

            <div className="flex flex-wrap gap-2">
                {exp["tech used"].map((tech: string) => (
                    <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-charcoal-light/5 dark:bg-white/5 dark:text-gray-300 rounded-full"
                    >
                        {tech}
                    </span>
                ))}

            </div>
        </div>
    );
};

export default Experience;
