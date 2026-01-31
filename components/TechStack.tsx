


import {
    SiPython,
    SiDocker,
    SiKubernetes,
    SiAmazon,
    SiTerraform,
    SiJenkins,
    SiGit,
    SiAnsible,
    SiReact,
    SiNextdotjs,
    SiLinux,
    SiPrometheus,
    SiGrafana,
    SiGnubash,
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiMongodb,
    SiPostgresql,
    SiRedis,
    SiAwslambda,
    SiSocketdotio,
    SiNginx,
    SiAmazons3,
    SiRazorpay,
    SiCloudflare,
    SiAuth0
} from 'react-icons/si';
import { FaServer, FaCode, FaLock } from 'react-icons/fa';

// Map icon strings to React Icons and their brand colors
const IconData: { [key: string]: { icon: any; color: string; className?: string } } = {
    SiPython: { icon: SiPython, color: "#3776AB" },
    SiDocker: { icon: SiDocker, color: "#2496ED" },
    SiKubernetes: { icon: SiKubernetes, color: "#326CE5" },
    SiAmazonaws: { icon: SiAmazon, color: "#FF9900" },
    SiTerraform: { icon: SiTerraform, color: "#7B42BC" },
    SiJenkins: { icon: SiJenkins, color: "#D24939" },
    SiGit: { icon: SiGit, color: "#F05032" },
    SiAnsible: { icon: SiAnsible, color: "#EE0000" },
    SiReact: { icon: SiReact, color: "#61DAFB" },
    SiNextdotjs: { icon: SiNextdotjs, color: "" },
    SiLinux: { icon: SiLinux, color: "#FCC624" },
    SiPrometheus: { icon: SiPrometheus, color: "#E6522C" },
    SiGrafana: { icon: SiGrafana, color: "#F46800" },
    SiGnubash: { icon: SiGnubash, color: "#4EAA25" },
    SiJavascript: { icon: SiJavascript, color: "#F7DF1E" },
    SiHtml5: { icon: SiHtml5, color: "#E34F26" },
    SiCss3: { icon: SiCss3, color: "#1572B6" },
    SiTypescript: { icon: SiTypescript, color: "#3178C6" },
    SiTailwindcss: { icon: SiTailwindcss, color: "#06B6D4" },
    SiNodedotjs: { icon: SiNodedotjs, color: "#339933" },
    SiMongodb: { icon: SiMongodb, color: "#47A248" },
    SiPostgresql: { icon: SiPostgresql, color: "#4169E1" },
    SiRedis: { icon: SiRedis, color: "#DC382D" },
    FaServer: { icon: FaServer, color: "#333333" },
    FaCode: { icon: FaCode, color: "#A0A0A0" },
    SiAuth0: { icon: SiAuth0, color: "#EB5424" },
    SiAwslambda: { icon: SiAwslambda, color: "#FF9900" },
    FaLock: { icon: FaLock, color: "#A0A0A0" },
    SiSocketdotio: { icon: SiSocketdotio, color: "#010101" },
    SiCloudflare: { icon: SiCloudflare, color: "#F38020" },
    SiRazorpay: { icon: SiRazorpay, color: "#3395FF" },
    SiAmazons3: { icon: SiAmazons3, color: "#569A31" },
    SiNginx: { icon: SiNginx, color: "#009639" },
};

interface TechStackProps {
    data: {
        fullStack: { name: string; icon: string }[];
        devOpsLearning: { name: string; icon: string; status?: string; blur?: boolean }[];
    };
}

const TechStack = ({ data }: TechStackProps) => {
    const renderTechGrid = (items: any[]) => {
        // Sort items: non-blurred first, blurred last
        const sortedItems = [...items].sort((a, b) => (a.blur === b.blur ? 0 : a.blur ? 1 : -1));

        return (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
                {sortedItems.map((tech) => {
                    const techData = IconData[tech.icon] || { icon: FaCode, color: "#000000" };
                    const Icon = techData.icon;

                    return (
                        <div
                            key={tech.name}
                            className={`flex flex-col items-center gap-2 group cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative ${tech.blur ? 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0' : ''}`}
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-xl flex items-center justify-center text-3xl md:text-4xl border border-charcoal-light/10 shadow-sm group-hover:shadow-lg group-hover:border-makima-red/50 transition-all duration-300 relative">
                                <Icon
                                    className={`w-[60%] h-[60%] ${techData.className || ''}`}
                                    style={{ color: techData.color || undefined }}
                                />
                                {tech.status && (
                                    <span className="absolute -top-2 -right-2 bg-makima-red text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter z-10">
                                        {tech.status}
                                    </span>
                                )}

                                {/* Hover Tooltip for Blurred Items */}
                                {tech.blur && (
                                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 origin-bottom z-50 shadow-xl whitespace-nowrap pointer-events-none border border-white/10 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-zinc-900">
                                        Amber is still learning or practicing it
                                    </div>
                                )}
                            </div>
                            <span className="text-xs font-mono tracking-widest text-charcoal-light/70 group-hover:text-makima-red transition-colors uppercase text-center max-w-[80px]">
                                {tech.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="py-8 space-y-20">
            <div>
                <h2 className="text-3xl font-serif font-bold mb-12 text-center text-makima-red flex items-center justify-center gap-4">
                    <span className="w-12 h-px bg-makima-red/50"></span>
                    ARSENAL (FULL STACK)
                    <span className="w-12 h-px bg-makima-red/50"></span>
                </h2>
                {renderTechGrid(data.fullStack)}
            </div>

            <div className="pt-8 border-t border-white/5">
                <h2 className="text-3xl font-serif font-bold mb-12 text-center text-makima-red flex items-center justify-center gap-4">
                    <span className="w-12 h-px bg-makima-red/50"></span>
                    UNDER CONSTRUCTION (DEVOPS)
                    <span className="w-12 h-px bg-makima-red/50"></span>
                </h2>
                {renderTechGrid(data.devOpsLearning)}
            </div>
        </div>
    );
};

export default TechStack;
