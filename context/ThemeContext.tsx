"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
    isCinematicMode: boolean;
    toggleCinematicMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Default to true as requested ("Cinematic ON")
    const [isCinematicMode, setIsCinematicMode] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedMode = localStorage.getItem("cinematicMode");
        if (savedMode !== null) {
            setIsCinematicMode(JSON.parse(savedMode));
        }
    }, []);

    const toggleCinematicMode = () => {
        setIsCinematicMode((prev) => {
            const next = !prev;
            localStorage.setItem("cinematicMode", JSON.stringify(next));
            return next;
        });
    };

    // Prevent hydration mismatch by initially rendering without the state-dependent styles
    // Or just provide the context value. The child components will handle the condition.
    return (
        <ThemeContext.Provider value={{ isCinematicMode: mounted ? isCinematicMode : false, toggleCinematicMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
