import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
    data: {
        about: {
            name: string;
            title: string;
            description: string;
            location?: string;
        };
        contact: {
            github: string;
            linkedin: string;
            twitter: string;
            email: string;
        };
    };
}

const VerifiedBadge = () => (
    <div className="flex items-center justify-center bg-blue-500 rounded-full p-0.5 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
        <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
    </div>
);

const Hero = ({ data }: HeroProps) => {
    const socialLinks = [
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            url: data.contact.linkedin,
        },
        {
            name: 'Twitter',
            icon: FaTwitter,
            url: data.contact.twitter,
        },
        {
            name: 'GitHub',
            icon: FaGithub,
            url: data.contact.github,
        },
        {
            name: 'Gmail',
            icon: SiGmail,
            url: `mailto:${data.contact.email}`,
        }
    ];

    return (
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center py-8 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Top Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-7xl">
                
                {/* 1. Profile Image Card (Tall) */}
                <div className="md:col-span-1 md:row-span-2 bg-neutral-900/50 border border-white/5 rounded-3xl p-4 backdrop-blur-sm relative overflow-hidden flex items-center justify-center group outline outline-1 outline-white/5">
                    <div className="relative w-full aspect-square md:aspect-auto md:h-full overflow-hidden rounded-2xl">
                        <Image
                            src="/hero-profile.webp"
                            alt={data.about.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority
                        />
                    </div>
                </div>

                {/* 2. Personal Data Card */}
                <div className="md:col-span-3 bg-neutral-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter uppercase">
                            {data.about.name}
                        </h1>
                        <VerifiedBadge />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-400 font-mono mb-6">
                        <div className="flex items-center gap-1.5 uppercase">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            {data.about.location || "Uttarakhand, IND"}
                        </div>
                        <span className="text-gray-700">|</span>
                        <div className="uppercase tracking-widest">{data.about.title}</div>
                    </div>
                </div>

                {/* 3. Social Icons Card */}
                <div className="md:col-span-1 bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
                    <div className="flex justify-around items-center w-full h-full">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-white/80 transition-all duration-300 hover:scale-125"
                                title={link.name}
                            >
                                <link.icon size={22} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* 4. Quick Actions Card */}
                <div className="md:col-span-2 bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden flex items-center gap-4">
                    <Link 
                        href="/blog" 
                        className="flex-1 bg-neutral-100 text-neutral-950 font-bold py-3 px-6 rounded-2xl text-center hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 uppercase text-sm tracking-widest"
                    >
                        Read Blog
                    </Link>
                    <a 
                        href={`mailto:${data.contact.email}`} 
                        className="flex-1 bg-neutral-800/50 text-white font-bold py-3 px-6 rounded-2xl text-center border border-white/10 hover:bg-neutral-800 transition-all duration-300 active:scale-95 uppercase text-sm tracking-widest"
                    >
                        Contact Me
                    </a>
                </div>

                {/* 5. Description Card */}
                <div className="md:col-span-4 bg-neutral-900/50 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden group">
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-mono leading-relaxed md:leading-snug uppercase transition-all duration-300">
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-zinc-500 tracking-tight">
                            {data.about.description}
                        </span>
                    </h2>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-white/10 transition-colors duration-500" />
                </div>

            </div>

            {/* Background elements - Subtle red glow at edges */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-makima-red/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-makima-red/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};

export default Hero;
