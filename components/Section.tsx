import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

const Section = ({ children, id, className = '', delay = 0 }: SectionProps) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={`relative py-20 px-6 md:px-12 max-w-7xl mx-auto ${className}`}
        >
            {children}
        </motion.section>
    );
};

export default Section;
