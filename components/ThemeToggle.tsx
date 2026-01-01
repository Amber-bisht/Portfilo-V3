
"use client";

import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export const ThemeToggle = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // On mount, check if there's a saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Default to dark if system preference is dark
            // But user requested "bg off white" default, so maybe default to light unless system is explicit
            // Actually, let's stick to 'light' as default per user request, unless explicitly 'dark'
            setTheme('light');
            document.documentElement.classList.remove('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-charcoal-light/10 text-black dark:text-white hover:text-makima-red hover:border-makima-red transition-all duration-300"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
    );
};
