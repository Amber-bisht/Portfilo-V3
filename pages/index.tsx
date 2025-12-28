import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Mail, Github, Linkedin, Twitter, MapPin, Home as HomeIcon, Briefcase, Cpu } from 'lucide-react';
import {
  SiPython, SiGo, SiGnubash, SiJavascript, SiTypescript,
  SiDocker, SiKubernetes, SiJenkins, SiGit, SiAnsible,
  SiTerraform, SiAmazon, SiPrometheus, SiGrafana, SiElasticstack
} from 'react-icons/si';
import fs from 'fs';
import path from 'path';

// Helper to get icon for tech
const getTechIcon = (techName: string) => {
  const norm = techName.toLowerCase();
  if (norm.includes('python')) return <SiPython className="w-5 h-5 text-[#3776AB]" />;
  if (norm.includes('go')) return <SiGo className="w-5 h-5 text-[#00ADD8]" />;
  if (norm.includes('bash')) return <SiGnubash className="w-5 h-5 text-white" />;
  if (norm.includes('javascript')) return <SiJavascript className="w-5 h-5 text-[#F7DF1E]" />;
  if (norm.includes('typescript')) return <SiTypescript className="w-5 h-5 text-[#3178C6]" />;
  if (norm.includes('docker')) return <SiDocker className="w-5 h-5 text-[#2496ED]" />;
  if (norm.includes('kubernetes')) return <SiKubernetes className="w-5 h-5 text-[#326CE5]" />;
  if (norm.includes('jenkins')) return <SiJenkins className="w-5 h-5 text-[#D24939]" />;
  if (norm.includes('git')) return <SiGit className="w-5 h-5 text-[#F05032]" />;
  if (norm.includes('ansible')) return <SiAnsible className="w-5 h-5 text-[#EE0000]" />;
  if (norm.includes('terraform')) return <SiTerraform className="w-5 h-5 text-[#623CE4]" />;
  if (norm.includes('aws')) return <SiAmazon className="w-5 h-5 text-[#FF9900]" />;
  if (norm.includes('prometheus')) return <SiPrometheus className="w-5 h-5 text-[#E6522C]" />;
  if (norm.includes('grafana')) return <SiGrafana className="w-5 h-5 text-[#F46800]" />;
  if (norm.includes('elk')) return <SiElasticstack className="w-5 h-5 text-[#005571]" />;
  return <div className="w-4 h-4 bg-gray-700 rounded-full" />;
};

interface DevOpsData {
  about: {
    name: string;
    title: string;
    description: string;
    image: string;
  };
  projects: Array<{
    id: number;
    title: string;
    description: string;
    technologies: string[];
  }>;
  techStack: {
    languages: string[];
    tools: string[];
    cloud: string[];
    monitoring: string[];
  };
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url: string;
    image: string;
  }>;
  contact: {
    email: string;
    linkedin: string;
    github: string;
    twitter: string;
    location: string;
  };
}

interface HomeProps {
  data: DevOpsData;
}

export default function Home({ data }: HomeProps) {
  return (
    <>
      <Head>
        <title>{data.about.name} - {data.about.title}</title>
        <meta name="description" content={data.about.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Amber Bisht" />
        <link rel="canonical" href="https://amberbisht.me/" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://amberbisht.me/" />
        <meta property="og:title" content={`${data.about.name} - ${data.about.title}`} />
        <meta property="og:description" content={data.about.description} />
        <meta property="og:image" content="https://amberbisht.me/images/profile.jpeg" />
        <meta property="og:site_name" content={data.about.name} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://amberbisht.me/" />
        <meta property="twitter:title" content={`${data.about.name} - ${data.about.title}`} />
        <meta property="twitter:description" content={data.about.description} />
        <meta property="twitter:image" content="https://amberbisht.me/images/profile.jpeg" />
        <meta property="twitter:creator" content="@amber_bisht" />
      </Head>

      <main className="min-h-screen md:h-screen w-full bg-black text-white overflow-y-auto md:overflow-hidden box-border p-4 sm:p-6 lg:p-8 font-sans selection:bg-white selection:text-black pb-24 md:pb-8">
        {/* Grid Layout: 3 Columns, Full Height */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full w-full max-w-[1920px] mx-auto">

          {/* COLUMN 1: About & Contact (Merged) - Spans 3 cols */}
          <div id="about" className="md:col-span-3 h-auto md:h-full flex flex-col gap-4">
            <div className="flex-1 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-3xl p-6 flex flex-col relative overflow-hidden shadow-2xl hover:border-neutral-600 transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

              {/* Profile Header */}
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white/20 mb-6 shadow-xl bg-neutral-800">
                  <Image
                    src={data.about.image}
                    alt={data.about.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight leading-none">{data.about.name}</h1>
                <h2 className="text-base md:text-lg text-neutral-400 font-medium mb-6 uppercase tracking-widest leading-snug">{data.about.title}</h2>
                <p className="text-sm md:text-sm text-neutral-300 leading-relaxed font-light mb-8 max-w-prose">
                  {data.about.description}
                </p>

                {/* Contact Info (Merged here) */}
                <div className="mt-auto pt-6 border-t border-neutral-800/50">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                    Connect
                  </h3>
                  <div className="space-y-3">
                    <a href={`mailto:${data.contact.email}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                      <Mail className="w-4 h-4 text-neutral-500 group-hover:text-white" />
                      <span className="text-xs font-medium text-neutral-300 group-hover:text-white truncate">{data.contact.email}</span>
                    </a>
                    <div className="flex items-center gap-3 p-2 rounded-lg">
                      <MapPin className="w-4 h-4 text-neutral-500" />
                      <span className="text-xs font-medium text-neutral-300">{data.contact.location}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-[10px] text-neutral-600 font-medium tracking-widest uppercase">
                  © 2026 Amber Bisht
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Projects & Certifications - Spans 6 cols */}
          <div id="projects" className="md:col-span-6 h-auto md:h-full flex flex-col gap-4">

            {/* Projects - Expanded to take most height */}
            <div className="flex-[2] bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-3xl p-6 flex flex-col overflow-hidden hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3 pb-3 border-b border-neutral-800/50">
                <span className="w-1.5 h-6 bg-white rounded-full"></span>
                Key Projects
              </h3>
              <div className="flex-1 flex flex-col gap-3 overflow-hidden">
                {/* Showing all 3 projects directly without scroll if space permits, otherwise minimal scroll */}
                {data.projects.map((project) => (
                  <div key={project.id} className="flex-1 min-h-0 group bg-neutral-950/60 rounded-xl p-4 hover:bg-neutral-900 transition-all duration-200 border border-neutral-800/50 hover:border-neutral-700 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors truncate">{project.title}</h4>
                    </div>
                    <p className="text-xs text-neutral-400 mb-2 line-clamp-2 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-800/50 text-neutral-300 border border-neutral-700/50 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Split into Certifications and Cloud */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[160px]">

              {/* Certifications Card */}
              <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-3xl p-5 flex flex-col justify-start hover:border-neutral-600 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-orange-500 rounded-full"></span>
                  Certifications
                </h3>

                <div className="flex items-center gap-4">
                  {data.certifications.map((cert) => (
                    <div key={cert.name} className="flex items-center gap-4 w-full">
                      <div className="relative w-16 h-16 flex-shrink-0 bg-white/5 rounded-xl p-2 border border-white/10 shadow-lg">
                        {cert.image && (
                          <Image
                            src={cert.image}
                            alt={cert.name}
                            fill
                            className="object-contain p-0.5"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white mb-1 leading-tight truncate" title={cert.name}>{cert.name}</h3>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-orange-400">{cert.issuer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cloud Card */}
              <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-3xl p-5 flex flex-col hover:border-neutral-600 transition-all duration-300 relative overflow-hidden group">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                  <span className="w-1 h-5 bg-[#FF9900] rounded-full"></span>
                  Cloud
                </h3>

                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <div className="p-4 rounded-full bg-[#FF9900]/10 border border-[#FF9900]/20 shadow-[0_0_15px_rgba(255,153,0,0.3)] group-hover:scale-110 transition-transform duration-300">
                    <SiAmazon className="w-12 h-12 text-[#FF9900]" />
                  </div>
                  <span className="text-lg font-bold text-white tracking-wide">AWS</span>
                </div>
              </div>

            </div>
          </div>

          {/* COLUMN 3: Tech Stack - Spans 3 cols */}
          <div id="skills" className="md:col-span-3 h-auto md:h-full">
            <div className="h-full w-full bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-3xl p-6 flex flex-col overflow-hidden hover:border-neutral-600 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-neutral-800/50 pb-4 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-purple-500 rounded-full"></span>
                Tech Arsenal
              </h3>

              {/* Unified Scroll container - Spacious Layout to fill height */}
              <div className="flex-1 flex flex-col gap-5 overflow-hidden">

                {/* Tools */}
                <div className="flex-[1.5] py-3 px-5 rounded-2xl bg-neutral-950/40 border border-neutral-800/40 flex flex-col justify-center">
                  <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">Tools</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {data.techStack.tools.map(item => (
                      <div key={item} className="flex items-center gap-3 group">
                        <div className="p-2 rounded-lg bg-neutral-900/50 group-hover:bg-neutral-800 transition-colors">
                          {getTechIcon(item).type({ className: "w-7 h-7 " + getTechIcon(item).props.className.split(' ').slice(2).join(' ') })}
                        </div>
                        <span className="text-sm text-neutral-200 font-medium truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monitoring */}
                <div className="flex-1 py-3 px-5 rounded-2xl bg-neutral-950/40 border border-neutral-800/40 flex flex-col justify-center">
                  <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">Monitoring</h4>
                  <div className="flex flex-col gap-3">
                    {data.techStack.monitoring.map(item => (
                      <div key={item} className="flex items-center gap-4 group">
                        <div className="p-2 rounded-lg bg-neutral-900/50 group-hover:bg-neutral-800 transition-colors">
                          {getTechIcon(item).type({ className: "w-8 h-8 " + getTechIcon(item).props.className.split(' ').slice(2).join(' ') })}
                        </div>
                        <span className="text-base text-neutral-200 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core */}
                <div className="flex-1 py-3 px-5 rounded-2xl bg-neutral-950/40 border border-neutral-800/40 flex flex-col justify-center">
                  <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">Core</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {data.techStack.languages.map(item => (
                      <div key={item} className="flex items-center gap-4 group">
                        <div className="p-2 rounded-lg bg-neutral-900/50 group-hover:bg-neutral-800 transition-colors">
                          {getTechIcon(item).type({ className: "w-8 h-8 " + getTechIcon(item).props.className.split(' ').slice(2).join(' ') })}
                        </div>
                        <span className="text-base text-neutral-200 font-medium">
                          {item.replace('JavaScript/TypeScript', 'JS/TS')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* Mobile Navigation - Floating Glass Bar */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/50 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-black/50">
            <a href="#about" className="text-neutral-400 hover:text-white transition-colors" aria-label="About">
              <HomeIcon className="w-5 h-5" />
            </a>
            <a href="#projects" className="text-neutral-400 hover:text-white transition-colors" aria-label="Projects">
              <Briefcase className="w-5 h-5" />
            </a>
            <a href="#skills" className="text-neutral-400 hover:text-white transition-colors" aria-label="Skills">
              <Cpu className="w-5 h-5" />
            </a>
            <a href="mailto:bishtamber0@gmail.com" className="text-neutral-400 hover:text-white transition-colors" aria-label="Contact">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const jsonPath = path.join(process.cwd(), 'data', 'data.json');
  const fileContents = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(fileContents);

  return {
    props: {
      data,
    },
  };
};
