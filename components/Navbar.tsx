"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion"; // Reverting to framer-motion for maximum compatibility

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}

interface NavBodyProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

interface NavItemsProps {
    items: {
        name: string;
        link: string;
    }[];
    className?: string;
    onItemClick?: () => void;
}

interface MobileNavProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

interface MobileNavHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface MobileNavMenuProps {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
    const { scrollY } = useScroll();
    const { isCinematicMode } = useTheme();
    const [visible, setVisible] = useState<boolean>(true);
    const [isSmall, setIsSmall] = useState<boolean>(false);
    
    // Initial check on mount
    React.useEffect(() => {
        const current = scrollY.get();
        setIsSmall(current > 50);
        setVisible(true);
    }, [scrollY]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest < 50) {
            setIsSmall(false);
            setVisible(true);
        } else {
            setIsSmall(true);
            setVisible(true);
        }
    });

    return (
        <motion.div
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1],
            }}
            className={cn("fixed inset-x-0 top-0 z-[110] w-full", className)}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(
                        child as React.ReactElement<{ visible?: boolean }>,
                        { visible: isSmall },
                    )
                    : child,
            )}
        </motion.div>
    );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
    const { isCinematicMode } = useTheme();
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(10px)" : "none",
                boxShadow: visible
                    ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                    : "none",
                width: visible ? "800px" : "100%",
                y: visible ? 20 : 0,
                paddingLeft: visible ? "20px" : "24px",
                paddingRight: visible ? "20px" : "24px",
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
            className={cn(
                "relative z-[60] mx-auto hidden w-full px-4 py-2 md:flex flex-row items-center justify-between self-start rounded-full bg-transparent transition-all",
                visible && "bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-2xl",
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

export const NavItems = ({ items, className, onItemClick, visible }: NavItemsProps & { visible?: boolean }) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <motion.div
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "hidden md:flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200",
                visible ? "relative h-10" : "flex-1",
                className,
            )}
        >
            {items.map((item, idx) => (
                <a
                    onMouseEnter={() => setHovered(idx)}
                    onClick={onItemClick}
                    className="relative px-4 py-2 text-neutral-400 hover:text-white transition-colors"
                    key={`link-${idx}`}
                    href={item.link}
                >
                    <AnimatePresence>
                        {hovered === idx && (
                            <motion.div
                                layoutId="hovered"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute inset-0 h-full w-full rounded-full bg-white/5 z-0"
                            />
                        )}
                    </AnimatePresence>
                    <span className="relative z-20 whitespace-nowrap">{item.name}</span>
                </a>
            ))}
        </motion.div>
    );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(10px)" : "none",
                boxShadow: visible
                    ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                    : "none",
                width: visible ? "90%" : "100%",
                paddingRight: visible ? "12px" : "12px",
                paddingLeft: visible ? "12px" : "12px",
                borderRadius: visible ? "2rem" : "0",
                y: visible ? 20 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
            }}
            className={cn(
                "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-transparent py-4 lg:hidden transition-all",
                visible && "bg-neutral-900/60 backdrop-blur-md border border-white/10",
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

export const MobileNavHeader = ({
    children,
    className,
}: MobileNavHeaderProps) => {
    return (
        <div
            className={cn(
                "flex w-full flex-row items-center justify-between",
                className,
            )}
        >
            {children}
        </div>
    );
};

export const MobileNavMenu = ({
    children,
    className,
    isOpen,
    onClose,
}: MobileNavMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={cn(
                        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-3xl bg-neutral-900 p-8 border border-white/10 shadow-2xl",
                        className,
                    )}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const MobileNavToggle = ({
    isOpen,
    onClick,
}: {
    isOpen: boolean;
    onClick: () => void;
}) => {
    return (
        <button onClick={onClick} className="p-2 text-white">
            {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
    );
};

export const NavbarLogo = ({ visible }: { visible?: boolean }) => {
    return (
        <a
            href="/"
            className="relative z-20 flex items-center gap-2"
        >
            <span className="text-xl font-bold tracking-tight text-white uppercase">
                AMBER<span className="text-white/50">BISHT</span>
            </span>
        </a>
    );
};

export const NavbarButton = ({
    href,
    as: Tag = "a",
    children,
    className,
    variant = "primary",
    ...props
}: {
    href?: string;
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "dark" | "gradient" | "pink" | "hireme";
} & (
        | React.ComponentPropsWithoutRef<"a">
        | React.ComponentPropsWithoutRef<"button">
    )) => {
    const baseStyles =
        "px-6 py-2.5 rounded-full text-sm font-bold relative cursor-pointer transition-all duration-300 inline-block text-center active:scale-95 whitespace-nowrap";

    const variantStyles = {
        primary:
            "bg-white text-black hover:bg-neutral-200 shadow-[0_0_24px_rgba(255,255,255,0.1)]",
        secondary: "bg-transparent text-white border border-white/10 hover:bg-white/5",
        dark: "bg-black text-white border border-white/10 hover:bg-neutral-900",
        gradient:
            "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
        pink: "bg-brand-pink text-brand-bg shadow-lg shadow-brand-pink/20 glow-pink hover:brightness-110",
        hireme: "text-white bg-transparent border border-white/20 hover:border-white/40 shadow-2xl relative overflow-hidden",
    };

    const Component = Tag as any;
    return (
        <Component
            href={href || undefined}
            className={cn(baseStyles, variantStyles[variant], className)}
            style={variant === 'hireme' ? { backgroundImage: 'url(/hireme.webp)', backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            {...props}
        >
            {variant === 'hireme' ? (
                <>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <span className="relative z-10">{children}</span>
                </>
            ) : (
                children
            )}
        </Component>
    );
};
