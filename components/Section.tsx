import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

const Section = ({ children, id, className = 'py-20' }: SectionProps) => {
    return (
        <section
            id={id}
            className={`relative px-6 md:px-12 max-w-7xl mx-auto ${className}`}
        >
            {children}
        </section>
    );
};

export default Section;
