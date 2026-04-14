import { getTechIcon } from '../utils/techIcons';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';


const Experience = ({ experiences }: { experiences: any[] }) => {
    const { isCinematicMode } = useTheme();
    return (
        <section id="experience" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experiences.map((exp, index) => (
                    <div
                        key={exp.id}
                        className="col-span-1 md:col-span-2 bg-neutral-900/50 border border-white/5 rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-makima-red/5 blur-[80px] rounded-full pointer-events-none -mr-16 -mt-16" />

                        {/* Background Image Layer */}
                        {isCinematicMode && (
                            <div className="absolute inset-0 z-0 opacity-90 transition-all duration-700 pointer-events-none">
                                <Image
                                    src="/experience.webp"
                                    alt="Experience Background"
                                    fill
                                    sizes="(max-width: 1200px) 100vw, 1200px"
                                    className="object-cover object-center"
                                    quality={60}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent" />
                            </div>
                        )}

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                                    <h4 className="text-makima-red font-medium text-lg">{exp.company}</h4>
                                </div>
                                <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                                    <span className="text-gray-400 font-mono text-sm">{exp.duration}</span>
                                    <span className="text-gray-400 text-xs">{exp.starttime} - {exp.endtime}</span>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-6 leading-relaxed max-w-4xl">
                                {exp.description}
                            </p>

                            {exp.company === 'Freelance' && (
                                <div className="mb-6">
                                    <Link
                                        href="/freelance"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-makima-red/10 text-makima-red rounded-lg hover:bg-makima-red/20 transition-colors font-medium text-sm border border-makima-red/20"
                                    >
                                        View Proof of Work
                                        <ExternalLink size={14} />
                                    </Link>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 mt-auto">
                                {exp["tech used"].map((tech: string) => {
                                    const { icon: Icon, color } = getTechIcon(tech);
                                    return (
                                        <div
                                            key={tech}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                                        >
                                            <Icon style={{ color: color }} className="text-base" />
                                            <span className="text-sm text-gray-300">{tech}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
