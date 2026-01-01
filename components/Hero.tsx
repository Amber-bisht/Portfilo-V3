import { motion, Variants } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

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
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        },
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Effect - "Eyes" or patterns could go here */}
            {/* Background Effect - "Eyes" or patterns could go here */}
            {/* Global background is now in Layout.tsx */}

            <motion.div
                className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="mb-4 inline-block relative">
                    <span className="text-makima-red font-bold tracking-[0.2em] text-sm md:text-base uppercase border-b-2 border-makima-red pb-1">
                        Identity: Confirmed
                    </span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-8xl font-serif font-black mb-6 tracking-tighter"
                >
                    {data.about.name.toUpperCase()}
                </motion.h1>

                <motion.h2
                    variants={itemVariants}
                    className="text-xl md:text-3xl text-makima-red font-light mb-8 tracking-widest font-serif"
                >
                    {data.about.title}
                </motion.h2>

                <motion.div variants={itemVariants} className="mb-12">
                    <h3 className="text-lg font-serif font-bold mb-4 border-b border-makima-red/30 inline-block pb-1">
                        THE CONTRACT
                    </h3>
                    <p className="text-black dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
                        {data.about.description.split('\n').map((line, i) => (
                            <span key={i} className="block mb-2">{line}</span>
                        ))}
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center gap-6 text-2xl">
                    <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-full shadow-md border border-black/20 dark:border-white/10 text-black dark:text-white hover:border-makima-red hover:text-makima-red hover:scale-110 transition-all duration-300">
                        <FaGithub />
                    </a>
                    <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-full shadow-md border border-black/20 dark:border-white/10 text-[#0077b5] hover:border-[#0077b5] hover:scale-110 transition-all duration-300">
                        <FaLinkedin />
                    </a>
                    <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-full shadow-md border border-black/20 dark:border-white/10 text-[#1DA1F2] hover:border-[#1DA1F2] hover:scale-110 transition-all duration-300">
                        <FaTwitter />
                    </a>
                    <a href={`mailto:${data.contact.email}`} className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-white/10 rounded-full shadow-md border border-black/20 dark:border-white/10 text-black dark:text-white hover:border-makima-red hover:text-makima-red hover:scale-110 transition-all duration-300">
                        <IoMail />
                    </a>
                </motion.div>
            </motion.div>

            {/* Decorative Chains (CSS borders) */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "40vh" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-0 left-10 md:left-20 w-[1px] bg-gradient-to-b from-makima-red to-transparent opacity-50"
            />
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "60vh" }}
                transition={{ duration: 1.5, delay: 0.7 }}
                className="absolute top-0 right-10 md:right-20 w-[1px] bg-gradient-to-b from-makima-red to-transparent opacity-50"
            />
        </section>
    );
};

export default Hero;
