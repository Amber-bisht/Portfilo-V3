import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

const Section = ({ children, id, className = '', delay = 0 }: SectionProps) => {
    return (
        <section
            id={id}
            className={`relative py-20 px-6 md:px-12 max-w-7xl mx-auto ${className}`}
        >
            {children}
        </section>
    );
};

export default Section;
