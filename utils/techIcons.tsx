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
    SiNextdotjs,
    SiTailwindcss,
    SiJsonwebtokens,
    SiGoogle,
    SiRazorpay,
    SiCloudflare,
    SiPostgresql,
    SiGooglegemini,
    SiOpenai
} from 'react-icons/si';
import { FaDatabase, FaServer, FaCode, FaCloud, FaTerminal, FaLock, FaTruck, FaVideo, FaRobot } from 'react-icons/fa';
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

    // Freelance / New
    "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
    "JWT": { icon: SiJsonwebtokens, color: "#000000" },
    "Google OAuth": { icon: SiGoogle, color: "#4285F4" },
    "Razorpay": { icon: SiRazorpay, color: "#3395FF" },
    "Cloudflare": { icon: SiCloudflare, color: "#F38020" },
    "Cloudflare Turnstile": { icon: SiCloudflare, color: "#F38020" },
    "Google reCAPTCHA v3": { icon: SiGoogle, color: "#4285F4" },
    "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
    "Gemini AI": { icon: SiGooglegemini, color: "#8E75B2" },
    "Groq AI API": { icon: SiOpenai, color: "#412991" },
    "Shiprocket": { icon: FaTruck, color: "#E02128" },
    "HLS": { icon: FaVideo, color: "#FF8800" },
    "Microservices": { icon: FaServer, color: "#333333" },
    "AES Encryption": { icon: FaLock, color: "#A0A0A0" },
    "Web Worker": { icon: FaTerminal, color: "#F7DF1E" },
    "Working on it": { icon: FaCode, color: "#FF9900" },
    "Image Optimization": { icon: FaCode, color: "#FF00FF" },
    "Performance": { icon: FaCode, color: "#00FF00" },
    "SSG": { icon: FaCode, color: "#000000" },
    "Admin Panel": { icon: FaTerminal, color: "#333333" },
    "VPS": { icon: FaServer, color: "#000000" },
    "Cipher": { icon: FaLock, color: "#000000" },
    "Open Source": { icon: FaCode, color: "#000000" },
    "Integration": { icon: FaCode, color: "#000000" }
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
