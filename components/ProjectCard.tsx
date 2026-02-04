"use client";

import { useState } from 'react';
import { Github, ExternalLink, Info, X } from 'lucide-react';
import { getTechIcon } from '../utils/techIcons';

interface ProjectProps {
    project: {
        id: number;
        title: string;
        description: string;
        technologies: string[];
        image?: string;
        github?: string;
        live?: string;
        tag?: string;
    };
    index: number;
}

const ProjectCard = ({ project, index }: ProjectProps) => {
    const [isInternalModalOpen, setIsInternalModalOpen] = useState(false);

    return (
        <>
            <div className="group relative bg-[#18181b] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all duration-300 shadow-xl flex flex-col h-full">
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden p-4 pb-0">
                    <div className="rounded-2xl overflow-hidden h-full w-full relative">
                        <div className="absolute inset-0 bg-transparent z-10" />
                        {project.tag && (
                            <div className="absolute top-2 right-2 z-20 px-3 py-1 bg-makima-red text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg">
                                {project.tag}
                            </div>
                        )}
                        <img
                            src={project.image || "https://placehold.co/600x400/1a1a1a/FFF?text=Project"}
                            alt={project.title}
                            className="w-full h-full object-cover transform"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-6 pb-6 pt-4 flex flex-col flex-grow">

                    {/* Title and Github */}
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                            {project.title}
                        </h3>
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors p-1"
                                aria-label="GitHub Repo"
                            >
                                <Github size={22} />
                            </a>
                        )}
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {(project.technologies || []).slice(0, 6).map((tech) => {
                            const { icon: Icon, color } = getTechIcon(tech);
                            return (
                                <span
                                    key={tech}
                                    className="px-3 py-1 bg-[#27272a] text-gray-300 text-xs font-medium rounded-full flex items-center gap-1.5"
                                >
                                    <Icon style={{ color: color }} className="text-sm" />
                                    {tech}
                                </span>
                            );
                        })}
                        {(project.technologies || []).length > 6 && (
                            <span
                                className="px-3 py-1 bg-[#27272a] text-gray-300 text-xs font-medium rounded-full cursor-help hover:bg-[#3f3f46] transition-colors"
                                title={(project.technologies || []).slice(6).join(', ')}
                            >
                                +{(project.technologies || []).length - 6}
                            </span>
                        )}
                    </div>


                    {/* Actions */}
                    <div className={`mt-auto gap-3 ${project.live ? "grid grid-cols-2" : "flex"}`}>
                        <button
                            onClick={() => setIsInternalModalOpen(true)}
                            className={`flex items-center justify-center py-2.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors ${!project.live ? "w-full" : ""}`}
                        >
                            Details
                        </button>

                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center py-2.5 bg-[#27272a] text-white text-sm font-semibold rounded-xl hover:bg-[#3f3f46] transition-colors"
                            >
                                Live
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isInternalModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#18181b] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 shadow-2xl">
                        <button
                            onClick={() => setIsInternalModalOpen(false)}
                            className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors z-50"
                        >
                            <X size={20} className="text-gray-400 hover:text-white" />
                        </button>

                        <div className="relative h-64 w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] to-transparent z-10" />
                            <img
                                src={project.image || "https://placehold.co/600x400/1a1a1a/FFF?text=Project"}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-6 left-8 z-20">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {project.title}
                                </h2>
                            </div>
                        </div>

                        <div className="p-8">
                            <h4 className="text-white font-semibold mb-3">
                                About
                            </h4>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                {project.description}
                            </p>

                            <h4 className="text-white font-semibold mb-3">
                                Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {(project.technologies || []).map((tech) => {
                                    const { icon: Icon, color } = getTechIcon(tech);
                                    return (
                                        <span
                                            key={tech}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-[#27272a] rounded-full text-sm text-gray-300"
                                        >
                                            <Icon style={{ color: color }} className="text-base" />
                                            {tech}
                                        </span>
                                    );
                                })}
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-white/10">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        <Github size={18} />
                                        Code
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#27272a] text-white font-bold rounded-xl hover:bg-[#3f3f46] transition-colors"
                                    >
                                        <ExternalLink size={18} />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectCard;
