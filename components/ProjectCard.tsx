"use client";

import { useState, useEffect } from 'react';
import { Github, ExternalLink, X, Youtube } from 'lucide-react';
import Image from 'next/image';
import { getTechIcon } from '../utils/techIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';


interface ProjectProps {
    project: {
        id: number;
        title: string;
        description: string;
        technologies: string[];
        image?: string;
        github?: string;
        live?: string;
        youtube?: string;
        tag?: string;
    };
    index: number;
    orientation?: "horizontal" | "vertical";
    priority?: boolean;
}

const ProjectCard = ({ 
    project, 
    index, 
    orientation = "vertical", 
    priority = false,
    showTag = true
}: ProjectProps & { showTag?: boolean }) => {
    const [isInternalModalOpen, setIsInternalModalOpen] = useState(false);
    const isHorizontal = orientation === "horizontal";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return (
        <>
            <div className={`group relative bg-neutral-900/50 border border-white/5 hover:border-makima-red/30 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_10px_30px_rgba(239,68,68,0.05)] transition-all duration-300 flex ${
                isHorizontal ? "md:flex-row flex-col h-full" : "flex-col h-full"
            }`}>


                <div className="absolute top-0 right-0 w-32 h-32 bg-makima-red/5 blur-[40px] rounded-full pointer-events-none -mr-8 -mt-8 group-hover:bg-makima-red/10 transition-colors z-[1]" />

                {/* Image Section */}
                <div className={`relative overflow-hidden ${isHorizontal ? "md:w-2/5 w-full h-48 md:h-full" : "h-48 w-full"}`}>
                    <div className="h-full w-full relative bg-white/5 border-4 md:border-8 border-black rounded-2xl overflow-hidden shadow-inner">
                        <div className="absolute inset-0 bg-transparent z-10" />
                        {project.tag && showTag && (
                            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black border border-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg">
                                {project.tag}
                            </div>
                        )}
                        <Image
                            src={project.image || "https://placehold.co/600x400/1a1a1a/FFF?text=Project"}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-top"
                            priority={priority}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-[5]" />
                    </div>
                </div>

                {/* Content Section */}
                <div className={`px-6 pb-6 pt-4 flex flex-col flex-grow ${isHorizontal ? "md:w-3/5" : ""}`}>

                    {/* Title and Icons */}
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-2">
                            {project.youtube && (
                                <a
                                    href={project.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                    aria-label="YouTube Video"
                                >
                                    <Youtube size={20} />
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors p-1"
                                    aria-label="GitHub Repo"
                                >
                                    <Github size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    <p className={`text-gray-400 text-sm leading-relaxed mb-4 ${isHorizontal ? "line-clamp-2 md:line-clamp-4" : "line-clamp-3"}`}>
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {(project.technologies || []).slice(0, isHorizontal ? 4 : 6).map((tech) => {
                            const { icon: Icon, color } = getTechIcon(tech);
                            return (
                                <span
                                    key={tech}
                                    className="px-2.5 py-1 bg-[#27272a] text-gray-300 text-[10px] font-medium rounded-full flex items-center gap-1.5"
                                >
                                    <Icon style={{ color: color }} className="text-xs" />
                                    {tech}
                                </span>
                            );
                        })}
                    </div>


                    {/* Actions */}
                    <div className={`mt-auto gap-3 grid ${
                        project.live && project.youtube 
                            ? "grid-cols-3" 
                            : (project.live || project.youtube) 
                                ? "grid-cols-2" 
                                : "grid-cols-1"
                    }`}>
                        <button
                            onClick={() => setIsInternalModalOpen(true)}
                            className="flex items-center justify-center py-2 bg-white text-black text-xs font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Details
                        </button>

                        {project.youtube && (
                            <a
                                href={project.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-colors"
                            >
                                <Youtube size={14} />
                                Video
                            </a>
                        )}

                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center py-2 bg-[#27272a] text-white text-xs font-semibold rounded-xl hover:bg-[#3f3f46] transition-colors"
                            >
                                Live
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {mounted && typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isInternalModalOpen && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                                className="bg-neutral-900 border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl backdrop-blur-2xl"
                            >
                                <button
                                    onClick={() => setIsInternalModalOpen(false)}
                                    className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors z-50"
                                >
                                    <X size={20} className="text-gray-400 hover:text-white" />
                                </button>

                                <div className="relative h-64 w-full">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] to-transparent z-10" />
                                    <Image
                                        src={project.image || "https://placehold.co/600x400/1a1a1a/FFF?text=Project"}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        className="object-cover object-top"
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

                                    <div className="flex flex-wrap md:flex-nowrap gap-4 pt-6 border-t border-white/10">
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
                                        {project.youtube && (
                                            <a
                                                href={project.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
                                            >
                                                <Youtube size={18} />
                                                Watch Video
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
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default ProjectCard;
