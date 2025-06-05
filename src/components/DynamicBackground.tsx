"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";
import { WeatherData } from "../types/weather";

interface DynamicBackgroundProps {
  weather: WeatherData | null;
}

// Define weather themes with gradients and particle effects
const getWeatherTheme = (weatherCondition: string) => {
  const condition = weatherCondition.toLowerCase();

  if (condition.includes("clear") || condition.includes("sun")) {
    return {
      gradient: "from-amber-300 via-orange-400 to-blue-400",
      particles: "sunny",
      colors: ["#fbbf24", "#f59e0b", "#3b82f6"],
    };
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    return {
      gradient: "from-slate-600 via-blue-700 to-indigo-900",
      particles: "rain",
      colors: ["#475569", "#1d4ed8", "#312e81"],
    };
  } else if (condition.includes("snow")) {
    return {
      gradient: "from-slate-200 via-blue-200 to-slate-400",
      particles: "snow",
      colors: ["#e2e8f0", "#bfdbfe", "#94a3b8"],
    };
  } else if (condition.includes("thunder") || condition.includes("storm")) {
    return {
      gradient: "from-slate-800 via-purple-900 to-black",
      particles: "lightning",
      colors: ["#1e293b", "#581c87", "#000000"],
    };
  } else if (condition.includes("cloud") || condition.includes("overcast")) {
    return {
      gradient: "from-gray-400 via-slate-500 to-gray-600",
      particles: "clouds",
      colors: ["#9ca3af", "#64748b", "#4b5563"],
    };
  } else if (condition.includes("fog") || condition.includes("mist")) {
    return {
      gradient: "from-gray-300 via-blue-200 to-slate-400",
      particles: "fog",
      colors: ["#d1d5db", "#bfdbfe", "#94a3b8"],
    };
  }

  return {
    gradient: "from-blue-400 via-blue-500 to-blue-600",
    particles: "default",
    colors: ["#60a5fa", "#3b82f6", "#2563eb"],
  };
};

// Rain particles component
const RainParticles = ({ count = 25 }: { count?: number }) => {
  const drops = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {drops.map((drop) => (
        <motion.div
          key={`rain-${drop}`}
          className="absolute bg-blue-300/60 rounded-full"
          style={{
            width: "2px",
            height: `${15 + Math.random() * 10}px`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
};

// Snow particles component
const SnowParticles = ({ count = 20 }: { count?: number }) => {
  const flakes = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {flakes.map((flake) => (
        <motion.div
          key={`snow-${flake}`}
          className="absolute bg-white rounded-full opacity-80"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: -20, rotate: 0 }}
          animate={{
            y: "110vh",
            rotate: 360,
            x: `${(Math.random() - 0.5) * 100}px`,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
};

// Lightning effect component
const LightningEffect = () => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash(true);
      setTimeout(() => setFlash(false), 100);
      setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 80);
      }, 200);
    }, 3000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {flash && (
        <motion.div
          className="absolute inset-0 bg-yellow-100/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 0.5, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </AnimatePresence>
  );
};

// Sun rays component
const SunRays = () => {
  const rays = Array.from({ length: 6 }, (_, i) => i);

  return (
    <>
      {rays.map((ray) => (
        <motion.div
          key={`sun-${ray}`}
          className="absolute bg-yellow-300/20 rounded-full blur-xl"
          style={{
            width: `${60 + ray * 15}px`,
            height: `${60 + ray * 15}px`,
            top: `${10 + ray * 5}%`,
            right: `${5 + ray * 8}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + ray * 0.5,
            repeat: Infinity,
            delay: ray * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

// Floating clouds component
const FloatingClouds = ({ count = 5 }: { count?: number }) => {
  const clouds = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {clouds.map((cloud) => (
        <motion.div
          key={`cloud-${cloud}`}
          className="absolute bg-white/10 rounded-full blur-sm"
          style={{
            width: `${50 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 25}px`,
            top: `${5 + cloud * 10}%`,
            left: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8 + cloud * 2,
            repeat: Infinity,
            delay: cloud * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

// Fog layers component
const FogLayers = () => {
  const layers = Array.from({ length: 6 }, (_, i) => i);

  return (
    <>
      {layers.map((layer) => (
        <motion.div
          key={`fog-${layer}`}
          className="absolute w-full bg-gray-200/10 blur-xl"
          style={{
            height: `${10 + layer * 3}%`,
            top: `${layer * 8}%`,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 4 + layer * 1,
            repeat: Infinity,
            delay: layer * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

// Animated gradient background using React Spring
const AnimatedGradient = ({ colors }: { colors: string[] }) => {
  const [colorIndex, setColorIndex] = useState(0);

  const styles = useSpring({
    background: `linear-gradient(135deg, ${
      colors[colorIndex % colors.length]
    }, ${colors[(colorIndex + 1) % colors.length]}, ${
      colors[(colorIndex + 2) % colors.length]
    })`,
    config: { duration: 3000 },
    onRest: () => {
      setTimeout(
        () => setColorIndex((prev) => (prev + 1) % colors.length),
        100
      );
    },
  });

  return (
    <animated.div style={styles} className="absolute inset-0 opacity-40" />
  );
};

// Main particle renderer
const renderWeatherParticles = (particleType: string) => {
  switch (particleType) {
    case "rain":
      return <RainParticles count={30} />;
    case "snow":
      return <SnowParticles count={25} />;
    case "lightning":
      return <LightningEffect />;
    case "sunny":
      return <SunRays />;
    case "clouds":
      return <FloatingClouds count={6} />;
    case "fog":
      return <FogLayers />;
    default:
      return <FloatingClouds count={3} />;
  }
};

export const DynamicBackground = ({ weather }: DynamicBackgroundProps) => {
  const [currentTheme, setCurrentTheme] = useState(getWeatherTheme("clear"));

  useEffect(() => {
    if (weather && weather.weather && weather.weather.length > 0) {
      setCurrentTheme(getWeatherTheme(weather.weather[0].description));
    } else {
      setCurrentTheme(getWeatherTheme("clear"));
    }
  }, [weather]);

  return (
    <motion.div
      className={`fixed inset-0 bg-gradient-to-br ${currentTheme.gradient} transition-all duration-1000`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Animated gradient overlay */}
      <AnimatedGradient colors={currentTheme.colors} />

      {/* Weather particles */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme.particles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {renderWeatherParticles(currentTheme.particles)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle breathing overlay */}
      <motion.div
        className="absolute inset-0 bg-black/10"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};
