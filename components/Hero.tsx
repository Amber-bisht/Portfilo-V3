import { FaLinkedin, FaGithub, FaTwitter, FaImage } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

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

const Hero = ({ data }: HeroProps) => {
    const { isCinematicMode, toggleCinematicMode } = useTheme();

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
                <div className="md:col-span-1 md:row-span-2 bg-neutral-900/50 border border-white/5 rounded-3xl p-4 backdrop-blur-sm relative overflow-hidden flex items-center justify-center group outline outline-1 outline-white/5 w-full max-w-sm mx-auto md:max-w-none md:mx-0 min-h-[350px] md:min-h-0">
                    {/* Background Image Layer */}
                    {isCinematicMode && (
                        <div className="absolute inset-0 z-0 opacity-90 transition-all duration-700 pointer-events-none">
                            <Image
                                src="/pfp.webp"
                                alt="Profile Background"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover object-center brightness-[1.1]"
                                quality={60}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent" />
                        </div>
                    )}

                    <div className="relative w-48 h-48 md:w-48 md:h-48 overflow-hidden rounded-2xl z-10 border border-white/10 shadow-2xl">
                        <Image
                            src="/hero-profile.webp"
                            alt={data.about.name}
                            fill
                            sizes="(max-width: 768px) 192px, 192px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            priority
                            quality={60}
                        />
                    </div>
                </div>

                {/* 2. Personal Data Card */}
                <div className="md:col-span-3 bg-neutral-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden flex flex-col justify-center">
                    {/* Background Image Layer */}
                    {isCinematicMode && (
                        <div className="absolute inset-0 z-0 opacity-90 transition-all duration-700 pointer-events-none">
                            <Image
                                src="/name.webp"
                                alt="Personal Data Background"
                                fill
                                sizes="(max-width: 1200px) 100vw, 1200px"
                                className="object-cover object-center brightness-[1.1]"
                                quality={60}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent" />
                        </div>
                    )}

                    <div className="relative z-10">
                        <div className="flex items-center gap-6 mb-2">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter uppercase">
                                {data.about.name}
                            </h1>

                            {/* Cinematic Mode Toggle */}
                            <button
                                onClick={toggleCinematicMode}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 ${isCinematicMode ? 'bg-white/20 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-white/10 border-white/30 text-zinc-200 hover:text-white'}`}
                                aria-label={isCinematicMode ? "Disable Cinematic Mode" : "Enable Cinematic Mode"}
                                title={isCinematicMode ? "Disable Cinematic Mode" : "Enable Cinematic Mode"}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                                    {isCinematicMode ? "Cinematic ON" : "Cinematic OFF"}
                                </span>
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white/90 font-mono mb-6">
                            <div className="flex items-center gap-1.5 uppercase font-bold">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                {data.about.location || "Uttarakhand, IND"}
                            </div>
                            <span className="text-white/60">|</span>
                            <div className="uppercase tracking-widest font-bold">{data.about.title}</div>
                        </div>
                    </div>
                </div>

                {/* 3. Social Icons Card */}
                <div className="md:col-span-1 bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
                    {/* Background Image Layer */}
                    {isCinematicMode && (
                        <div className="absolute inset-0 z-0 opacity-90 transition-all duration-700 pointer-events-none">
                            <Image
                                src="/sunflower.webp"
                                alt="Social Background"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover object-center brightness-[1.1]"
                                quality={60}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent" />
                        </div>
                    )}

                    <div className="relative z-10 flex justify-around items-center w-full h-full">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-white/80 transition-all duration-300 hover:scale-125 focus:scale-125 outline-none"
                                aria-label={link.name}
                                title={link.name}
                            >
                                <link.icon size={22} aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* 4. Quick Actions Card */}
                <div className="md:col-span-2 bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden flex items-center gap-4">
                    {/* Background Image Layer */}
                    {isCinematicMode && (
                        <div className="absolute inset-0 z-0 opacity-90 transition-all duration-700 pointer-events-none">
                            <Image
                                src="/spin.webp"
                                alt="Actions Background"
                                fill
                                sizes="(max-width: 1200px) 100vw, 800px"
                                className="object-cover object-center brightness-[1.1]"
                                quality={60}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent" />
                        </div>
                    )}

                    <Link
                        href="/blog"
                        className="relative z-10 flex-1 bg-neutral-100 text-neutral-950 font-bold py-3 px-6 rounded-2xl text-center hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95 uppercase text-sm tracking-widest"
                    >
                        Read Blog
                    </Link>
                    <a
                        href={`mailto:${data.contact.email}`}
                        className="relative z-10 flex-1 bg-neutral-800/50 text-white font-bold py-3 px-6 rounded-2xl text-center border border-white/10 hover:bg-neutral-800 transition-all duration-300 active:scale-95 uppercase text-sm tracking-widest"
                    >
                        Contact Me
                    </a>
                </div>

                {/* 5. Description Card */}
                <div className="md:col-span-4 bg-neutral-900/50 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden group">
                    {/* Background Image Layer */}
                    {isCinematicMode && (
                        <div className="absolute inset-0 z-0 opacity-90 transition-all duration-700 pointer-events-none">
                            <Image
                                src="/desc.webp"
                                alt="Description Background"
                                fill
                                sizes="100vw"
                                priority
                                className="object-cover object-center brightness-[1.1]"
                                quality={60}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />
                        </div>
                    )}

                    <div className="relative z-10">
                        <h2 className="text-xl md:text-3xl lg:text-4xl font-mono leading-relaxed md:leading-snug uppercase transition-all duration-300 text-white tracking-tight">
                            {data.about.description || "Scalable Systems Engineer focused on building production-grade, end-to-end platforms with emphasis on backend architecture, performance optimization, and infrastructure reliability."}
                        </h2>
                    </div>
                </div>

            </div>

            {/* Background elements - Subtle red glow at edges */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-makima-red/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-makima-red/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};

export default Hero;
