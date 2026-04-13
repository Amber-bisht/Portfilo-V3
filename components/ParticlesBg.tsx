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
                        onHover: {
                            enable: true,
                            mode: "grab",
                        },
                        resize: { enable: true },
                    },
                    modes: {
                        grab: {
                            distance: 200,
                            links: {
                                opacity: 0.4,
                            },
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#00001a", "#000033", "#00004d", "#000080"],
                    },
                    links: {
                        color: "#000080",
                        distance: 220,
                        enable: true,
                        opacity: 0.15,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: true,
                        speed: 0.4,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 60,
                    },
                    opacity: {
                        value: { min: 0.05, max: 0.3 },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 3, max: 6 },
                    },
                },
                detectRetina: true,
            }}
            className="fixed inset-0 pointer-events-none z-0"
        />
    );
};

export default ParticlesBg;
