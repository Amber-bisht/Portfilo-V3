


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
import Marquee from "react-fast-marquee";

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
    const renderMarqueeRow = (items: any[], direction: "left" | "right" = "left", speed: number = 30) => {
        // Sort items: non-blurred first, blurred last
        const sortedItems = [...items].sort((a, b) => (a.blur === b.blur ? 0 : a.blur ? 1 : -1));

        return (
            <Marquee
                speed={speed}
                gradient={false}
                direction={direction}
                pauseOnHover
                className="py-4 overflow-hidden"
            >
                <div className="flex items-center gap-4 px-4">
                    {sortedItems.map((tech) => {
                        const techData = IconData[tech.icon] || { icon: FaCode, color: "#000000" };
                        const Icon = techData.icon;

                        return (
                            <div
                                key={tech.name}
                                className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-makima-red/50 hover:bg-white/10 transition-all duration-300 relative"
                            >
                                <Icon
                                    className={`text-xl ${techData.className || ''} group-hover:scale-110 transition-transform`}
                                    style={{ color: techData.color || undefined }}
                                />
                                <span className="text-sm font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors whitespace-nowrap">
                                    {tech.name}
                                </span>

                                {tech.status && (
                                    <span className="absolute -top-1 -right-1 bg-makima-red text-white text-[7px] px-1 py-0.5 rounded-full font-bold uppercase tracking-tighter z-10">
                                        {tech.status}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Marquee>
        );
    };

    return (
        <div className="py-8 space-y-4">
            <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 text-left border-l-4 border-makima-red pl-6">
                    TECH STACK & TOOLS
                </h2>
                {renderMarqueeRow(data.fullStack, "left", 35)}
                {renderMarqueeRow(data.devOpsLearning, "right", 25)}
            </div>
        </div>
    );
};

export default TechStack;
