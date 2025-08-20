"use client";

import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function BackgroundParticles() {
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 bg-transparent z-[-1]"
      options={{
        background: {
          color: "#ffffff",
        },
        fullScreen: { enable: false }, // چون absolute داریم
        particles: {
          number: { value: 20 },
          color: { value: ["#facc15", "#3b82f6"] },
          shape: { type: "circle" },
          opacity: { value: 0.6 },
          size: { value: { min: 4, max: 10 } },
          move: {
            enable: true,
            speed: 0.9,
            direction: "none",
            outModes: "out",
          },
        },
      }}
    />
  );
}
