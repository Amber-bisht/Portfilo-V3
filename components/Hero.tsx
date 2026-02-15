import { FaLinkedin, FaGithub, FaTwitter, FaFileAlt, FaEnvelope } from 'react-icons/fa';


interface HeroProps {
    data: {
        about: {
            name: string;
            title: string;
            description: string;
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


    const socialLinks = [
        {
            name: 'GitHub',
            icon: FaGithub,
            url: data.contact.github,
            colorClass: 'hover:bg-white hover:text-black hover:border-white',
            bgClass: 'bg-zinc-800/50'
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            url: data.contact.linkedin,
            colorClass: 'hover:border-makima-red hover:text-makima-red',
            bgClass: 'bg-zinc-800/50'
        },
        {
            name: 'Twitter',
            icon: FaTwitter,
            url: data.contact.twitter,
            colorClass: 'hover:border-makima-red hover:text-makima-red',
            bgClass: 'bg-zinc-800/50'
        }
    ];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden py-20 px-4 md:px-8">
            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Content Section (Left) */}
                <div className="text-center md:text-left order-2 md:order-1 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-white mb-4 tracking-tight">
                        Hi, I&apos;m
                    </h2>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black mb-6 tracking-tighter text-white">
                        {data.about.name}
                    </h1>

                    {/* Role Badge */}
                    <div className="mb-8">
                        <span className="inline-block px-6 py-3 bg-zinc-800 rounded-lg text-lg md:text-2xl font-bold tracking-wide text-white border border-white/5 uppercase">
                            {data.about.title}
                        </span>
                    </div>

                    <p className="text-gray-400 max-w-xl mx-auto md:mx-0 text-base md:text-lg leading-relaxed mb-10">
                        {data.about.description}
                    </p>

                    {/* Buttons Group */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
                        <a
                            href={`mailto:${data.contact.email}`}
                            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-lg"
                        >
                            <FaEnvelope />
                            Contact
                        </a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative flex items-center justify-center w-12 h-12 rounded-lg border border-zinc-700 text-gray-400 transition-all duration-300 hover:-translate-y-1 ${link.bgClass} ${link.colorClass}`}
                            >
                                <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-black text-sm font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 origin-bottom z-50 shadow-[0_0_15px_rgba(255,255,255,0.2)] whitespace-nowrap pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-white">
                                    {link.name}
                                </span>
                                <link.icon className="text-xl" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Profile Image (Right) */}
                <div className="flex justify-center md:justify-end order-1 md:order-2 relative">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] group">
                        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-zinc-800/50 shadow-2xl transition-all duration-700 hover:scale-[1.02]">
                            <img
                                src="https://i.pinimg.com/1200x/ad/f8/cb/adf8cbc0c6f2b3f964ce6f6def9658db.jpg"
                                alt="Amber Bisht"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Background elements */}

        </section>
    );
};

export default Hero;
