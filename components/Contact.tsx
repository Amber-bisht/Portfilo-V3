import { FaLinkedin, FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

import dynamic from 'next/dynamic';
import { ExternalLink, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import MusicPlayer from './MusicPlayer';
import globalData from '../data/data.json';

const GithubContributions = dynamic(() => import('./GithubContributions'), { ssr: false });

interface ContactProps {
    data: {
        about: {
            name: string;
            image: string;
            title: string;
        };
        contact: {
            email: string;
            github: string;
            linkedin: string;
            twitter: string;
        };
    };
    githubStats: any;
}

const Contact = ({ data, githubStats }: ContactProps) => {
    return (
        <section id="contact" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-6">
                {/* Top Left: Status / Location */}
                <div className="md:col-span-2 h-full min-h-[240px] bg-neutral-900/50 border border-white/5 rounded-3xl p-8 flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-makima-red/10 blur-[80px] rounded-full pointer-events-none -mr-16 -mt-16 z-[1]" />

                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-gray-400 font-medium mb-1">Current Status</h3>
                            <p className="text-2xl md:text-3xl font-bold text-white mb-2">Open to Opportunities</p>
                            <Link href="/freelance" className="inline-flex items-center gap-2 text-sm text-makima-red hover:text-white transition-colors font-semibold">
                                View My Freelance Work <ExternalLink size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="bg-black/20 p-4 rounded-2xl backdrop-blur-sm">
                                <span className="block text-3xl font-bold text-makima-red mb-1">1+</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Years Exp.</span>
                            </div>
                            <div className="bg-black/20 p-4 rounded-2xl backdrop-blur-sm">
                                <span className="block text-3xl font-bold text-makima-red mb-1">6+</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Projects</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Right: Github Graph */}
                <div className="md:col-span-2 h-full min-h-[240px] bg-neutral-900/50 border border-white/5 rounded-3xl p-6 flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <FaGithub className="text-xl text-white" />
                            <span className="font-bold text-gray-200">Activity</span>
                        </div>
                        <a href={data.contact.github} className="text-xs text-gray-400 hover:text-white transition-colors">View Github</a>
                    </div>
                    <div className="flex-1 flex items-center justify-center w-full">
                        <div className="w-full">
                            <GithubContributions githubStats={githubStats} />
                        </div>
                    </div>
                </div>

                {/* Bottom Left: Profile */}
                <div className="md:col-span-1 h-full min-h-[240px] bg-neutral-900/50 border border-white/5 rounded-3xl p-4 flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 flex-1">
                        <Image src={data.about.image} alt={data.about.name} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <h3 className="text-lg font-bold text-white leading-tight">{data.about.name}</h3>
                            <p className="text-xs text-gray-300">{data.about.title}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Mid: Socials */}
                <div className="md:col-span-1 h-full min-h-[240px] flex flex-col gap-4">
                    <a href={data.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex-1 bg-[#0a66c2] rounded-3xl flex items-center justify-center relative overflow-hidden group hover:opacity-90 transition-opacity">
                        <FaLinkedin className="text-4xl text-white" />
                        <ExternalLink className="absolute top-3 right-3 text-white/50 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a href={data.contact.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="flex-1 bg-black border border-white/10 rounded-3xl flex items-center justify-center relative overflow-hidden group hover:bg-neutral-900 transition-colors">
                        <FaTwitter className="text-4xl text-white" />
                        <ExternalLink className="absolute top-3 right-3 text-white/50 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>

                {/* Bottom Right: Stacked Mail & Spotify */}
                <div className="md:col-span-2 h-full min-h-[240px] flex flex-col gap-4">
                    {/* Mail Part */}
                    <div className="flex-1 relative bg-neutral-900/40 backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-center overflow-hidden group border border-white/5 hover:border-red-500/20 transition-all duration-500">
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                    {data.contact.email}
                                </h3>
                                <p className="text-zinc-300 text-sm font-medium italic">
                                    &apos;Let&apos;s build something great together.&apos;
                                </p>
                            </div>

                            <a
                                href={`mailto:${data.contact.email}`}
                                className="group/btn relative px-8 py-3 bg-white text-black text-xs font-bold rounded-2xl hover:bg-zinc-200 transition-all duration-300 shadow-xl overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Mail size={16} />
                                    Send Email
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Custom Music Player (Full Playback) */}
                    <div className="h-[152px] bg-[#1e1f22] border border-white/5 rounded-3xl overflow-hidden group hover:border-white/10 transition-colors">
                        <MusicPlayer tracks={globalData.music} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
