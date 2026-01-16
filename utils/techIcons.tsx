import {
    SiReact,
    SiNodedotjs,
    SiDocker,
    SiMongodb,
    SiJenkins,
    SiGithubactions,
    SiAmazon,
    SiGnubash,
    SiKubernetes,
    SiTerraform,
    SiPrometheus,
    SiGrafana,
    SiHelm,
    SiHostinger,
    SiLinux,
    SiAnsible,
    SiGit,
    SiPython,
    SiJavascript,
    SiGo,
    SiNextdotjs
} from 'react-icons/si';
import { FaDatabase, FaServer, FaCode, FaCloud, FaTerminal } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface TechIcon {
    icon: IconType;
    color: string;
}

const techIconMap: { [key: string]: TechIcon } = {
    // Operations / Experience
    "ReactJS": { icon: SiReact, color: "#61DAFB" },
    "NodeJS": { icon: SiNodedotjs, color: "#339933" },
    "Docker": { icon: SiDocker, color: "#2496ED" },
    "Hostinger": { icon: SiHostinger, color: "#673DE6" },
    "MongoDB": { icon: SiMongodb, color: "#47A248" },

    // Projects
    "Jenkins": { icon: SiJenkins, color: "#D24939" },
    "GitHub Actions": { icon: SiGithubactions, color: "#2088FF" },
    "AWS": { icon: SiAmazon, color: "#FF9900" },
    "Bash": { icon: SiGnubash, color: "#4EAA25" },
    "Kubernetes": { icon: SiKubernetes, color: "#326CE5" },
    "AWS EKS": { icon: SiAmazon, color: "#FF9900" }, // Using Amazon icon for EKS
    "Terraform": { icon: SiTerraform, color: "#7B42BC" },
    "Prometheus": { icon: SiPrometheus, color: "#E6522C" },
    "Grafana": { icon: SiGrafana, color: "#F46800" },
    "Helm": { icon: SiHelm, color: "#0F1689" },
    "HCL": { icon: SiTerraform, color: "#7B42BC" }, // Using Terraform icon for HCL
    "State Management": { icon: FaDatabase, color: "#A0A0A0" }, // Generic database/storage icon

    // Others / Fallbacks
    "Python": { icon: SiPython, color: "#3776AB" },
    "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
    "Go": { icon: SiGo, color: "#00ADD8" },
    "Next.js": { icon: SiNextdotjs, color: "#000000" },
    "Linux": { icon: SiLinux, color: "#FCC624" },
    "Git": { icon: SiGit, color: "#F05032" },
    "Ansible": { icon: SiAnsible, color: "#EE0000" },
};

export const getTechIcon = (techName: string): TechIcon => {
    // Direct match
    if (techIconMap[techName]) {
        return techIconMap[techName];
    }

    // Normalized match (case insensitive)
    const lowerName = techName.toLowerCase();
    const foundKey = Object.keys(techIconMap).find(key => key.toLowerCase() === lowerName);
    if (foundKey) {
        return techIconMap[foundKey];
    }

    // Default fallback
    return { icon: FaCode, color: "#888888" };
};
