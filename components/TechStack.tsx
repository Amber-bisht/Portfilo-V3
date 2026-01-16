


import {
    SiPython,
    SiGo,
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
    SiCodeigniter,
    SiPrometheus,
    SiGrafana,
    SiGnubash,
    SiJavascript
} from 'react-icons/si';

// Map icon strings to React Icons and their brand colors
const IconData: { [key: string]: { icon: any; color: string; className?: string } } = {
    SiPython: { icon: SiPython, color: "#3776AB" },
    SiGo: { icon: SiGo, color: "#00ADD8" },
    SiDocker: { icon: SiDocker, color: "#2496ED" },
    SiKubernetes: { icon: SiKubernetes, color: "#326CE5" },
    SiAmazonaws: { icon: SiAmazon, color: "#FF9900" },
    SiTerraform: { icon: SiTerraform, color: "#7B42BC" },
    SiJenkins: { icon: SiJenkins, color: "#D24939" },
    SiGit: { icon: SiGit, color: "#F05032" },
    SiAnsible: { icon: SiAnsible, color: "#EE0000" },
    SiReact: { icon: SiReact, color: "#61DAFB" },
    SiNextdotjs: { icon: SiNextdotjs, color: "" }, // Adaptive
    SiLinux: { icon: SiLinux, color: "#FCC624" },
    SiPrometheus: { icon: SiPrometheus, color: "#E6522C" },
    SiGrafana: { icon: SiGrafana, color: "#F46800" },
    SiGnubash: { icon: SiGnubash, color: "#4EAA25" },
    SiJavascript: { icon: SiJavascript, color: "#F7DF1E" },
};

interface TechStackProps {
    data: { name: string; icon: string }[];
}

const TechStack = ({ data }: TechStackProps) => {
    return (
        <div className="py-8">
            <h2 className="text-4xl font-serif font-bold mb-12 text-center text-makima-red flex items-center justify-center gap-4">
                <span className="w-12 h-px bg-makima-red/50"></span>
                DEVIL CONTRACTS
                <span className="w-12 h-px bg-makima-red/50"></span>
            </h2>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
                {data.map((tech, index) => {
                    const techData = IconData[tech.icon] || { icon: SiCodeigniter, color: "#000000" };
                    const Icon = techData.icon;

                    return (
                        <div
                            key={tech.name}
                            className="flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-300"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-neutral-900/50 rounded-xl flex items-center justify-center text-3xl md:text-4xl border border-charcoal-light/10 shadow-sm group-hover:border-makima-red/50 transition-all duration-300">
                                <Icon
                                    className={`w-[60%] h-[60%] ${techData.className || ''}`}
                                    style={{ color: techData.color || undefined }}
                                />
                            </div>
                            <span className="text-xs font-mono tracking-widest text-charcoal-light/70 group-hover:text-makima-red transition-colors uppercase">
                                {tech.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TechStack;
