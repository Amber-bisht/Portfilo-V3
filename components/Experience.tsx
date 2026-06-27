import { useState } from 'react';
import { getTechIcon } from '../utils/techIcons';

const ExperienceCard = ({ exp }: { exp: any }) => {
    const isOngoing = exp.duration === 'Ongoing' || exp.endtime === 'Present';
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="col-span-1 md:col-span-2 bg-neutral-900/50 p-8 border border-white/5 hover:border-white/10 rounded-3xl flex flex-col relative overflow-hidden group transition-all duration-300 cursor-pointer select-none"
        >
            {isOngoing && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-makima-red/5 blur-[80px] rounded-full pointer-events-none -mr-16 -mt-16" />
            )}

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                        <div className="flex items-center gap-4">
                            {exp.logo && (
                                <img
                                    src={exp.logo}
                                    alt={`${exp.company} logo`}
                                    className="w-12 h-12 rounded-lg object-cover border border-white/10 bg-white/5"
                                />
                            )}
                            <div>
                                <h3 className={`${isOngoing ? 'text-2xl' : 'text-xl'} font-bold text-white mb-1`}>
                                    {exp.title}
                                </h3>
                                <h4 className="text-makima-red font-medium text-lg">{exp.company}</h4>
                            </div>
                        </div>
                        <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                            <span className="text-gray-400 font-mono text-sm">{exp.duration}</span>
                            <span className="text-gray-400 text-xs">{exp.starttime} - {exp.endtime}</span>
                        </div>
                    </div>

                    {isExpanded && exp.description && (
                        <p className="text-gray-300 mb-6 leading-relaxed max-w-4xl text-base transition-all duration-300">
                            {exp.description}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap gap-2.5 mt-auto">
                    {exp["tech used"].map((tech: string) => {
                        const { icon: Icon, color } = getTechIcon(tech);
                        return (
                            <div
                                key={tech}
                                className="flex items-center gap-2 px-2.5 py-1 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                            >
                                <Icon style={{ color: color }} className="text-xs" aria-hidden="true" />
                                <span className="text-xs text-gray-300">{tech}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const Experience = ({ experiences }: { experiences: any[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} />
            ))}
        </div>
    );
};

export default Experience;

