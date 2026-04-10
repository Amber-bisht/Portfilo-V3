import React from "react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";

const ParticlesBg: React.FC = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: { enable: false },
                        onHover: { enable: true, mode: "repulse" },
                        resize: { enable: true },
                    },
                    modes: {
                        repulse: { distance: 100, duration: 0.4 },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        enable: false,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: 0.4,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.4 },
                        animation: {
                            enable: true,
                            speed: 1.5,
                            sync: false
                        }
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 3.5 },
                    },
                },
                detectRetina: true,
            }}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
};

export default ParticlesBg;
