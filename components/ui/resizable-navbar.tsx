"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
} from "motion/react";
import Image from "next/image";

import React, { useState, useEffect } from "react";


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
  onLinkClick?: () => void;
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
  const [visible, setVisible] = useState<boolean>(true);

  // Use window scroll directly for better detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      
      // Show on initial load (scroll at top) or when scrolled down past 100px
      if (scrollPosition === 0 || scrollPosition > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
      }}
      // Fixed position, 30px from top, slides down when scrolling
      className={cn("fixed inset-x-0 top-[30px] z-40 w-full px-4", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(12px)",
        boxShadow: visible
          ? "0 4px 24px rgba(0, 0, 0, 0.3), 0 8px 48px rgba(0, 0, 0, 0.4)"
          : "0 2px 12px rgba(0, 0, 0, 0.2)",
        width: visible ? "70%" : "90%",
        scale: visible ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
      }}
      style={{
        minWidth: "600px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-white/95 dark:bg-gray-900/95 px-8 py-3 lg:flex shadow-2xl backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, onLinkClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onLinkClick) {
      onLinkClick();
    }
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-3 text-sm font-medium text-gray-700 dark:text-gray-200 transition duration-200 hover:text-gray-900 dark:hover:text-gray-300 lg:flex lg:space-x-3 pointer-events-none",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={handleClick}
          className="relative px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white pointer-events-auto"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-200/80 dark:bg-gray-700/50"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(12px)",
        boxShadow: visible
          ? "0 4px 24px rgba(0, 0, 0, 0.3), 0 8px 48px rgba(0, 0, 0, 0.4)"
          : "0 2px 12px rgba(0, 0, 0, 0.2)",
        width: visible ? "85%" : "92%",
        scale: visible ? 0.98 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white/95 dark:bg-gray-900/95 px-4 py-3 rounded-2xl lg:hidden shadow-2xl backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50",
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl px-4 py-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50",
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
  return isOpen ? (
    <IconX className="text-gray-700 dark:text-gray-200 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-gray-700 dark:text-gray-200 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors" onClick={onClick} />
  );
};

export const NavbarLogo = ({ name }: { name?: string }) => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-base font-semibold text-gray-900 dark:text-gray-100"
    >
      <span className="font-semibold text-gray-900 dark:text-gray-100">{name || "Startup"}</span>
      <Image 
        src="https://cdn-icons-png.flaticon.com/512/11423/11423254.png"
        alt="Sword"
        width={56}
        height={56}
        className="w-5 h-5 object-contain dark:brightness-0 dark:invert"
        unoptimized
      />
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
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

