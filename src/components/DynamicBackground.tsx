"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState, memo } from "react";
import { WeatherData } from "../types/weather";

interface DynamicBackgroundProps {
  weather: WeatherData | null;
}

// Define weather themes with gradients and particle effects
const getWeatherTheme = (weatherCondition: string) => {
  const condition = weatherCondition.toLowerCase();

  // Debug logging to understand what conditions we're getting
  console.log("🌤️ Weather condition received:", weatherCondition);
  console.log("🌤️ Lowercase condition:", condition);

  // Clear sky conditions
  if (
    condition.includes("clear") ||
    condition.includes("sunny") ||
    condition === "clear sky"
  ) {
    console.log("🌞 Matched sunny condition");
    return {
      gradient: "from-amber-300 via-orange-400 to-blue-400",
      particles: "sunny",
      colors: ["#fbbf24", "#f59e0b", "#3b82f6"],
    };
  }

  // Rain conditions (including drizzle and shower)
  else if (
    condition === "rain" ||
    condition === "drizzle" ||
    condition.includes("rain") ||
    condition.includes("drizzle") ||
    condition.includes("shower") ||
    condition.includes("light rain") ||
    condition.includes("moderate rain") ||
    condition.includes("heavy rain")
  ) {
    console.log("🌧️ Matched rain condition");
    return {
      gradient: "from-slate-600 via-blue-700 to-indigo-900",
      particles: "rain",
      colors: ["#475569", "#1d4ed8", "#312e81"],
    };
  }

  // Snow conditions
  else if (
    condition === "snow" ||
    condition.includes("snow") ||
    condition.includes("sleet") ||
    condition.includes("freezing")
  ) {
    console.log("❄️ Matched snow condition");
    return {
      gradient: "from-slate-200 via-blue-200 to-slate-400",
      particles: "snow",
      colors: ["#e2e8f0", "#bfdbfe", "#94a3b8"],
    };
  }

  // Thunderstorm conditions
  else if (
    condition === "thunderstorm" ||
    condition.includes("thunder") ||
    condition.includes("storm")
  ) {
    console.log("⚡ Matched thunderstorm condition");
    return {
      gradient: "from-slate-800 via-purple-900 to-black",
      particles: "lightning",
      colors: ["#1e293b", "#581c87", "#000000"],
    };
  }

  // Cloud conditions
  else if (
    condition === "clouds" ||
    condition.includes("cloud") ||
    condition.includes("overcast") ||
    condition.includes("few clouds") ||
    condition.includes("scattered clouds") ||
    condition.includes("broken clouds")
  ) {
    console.log("☁️ Matched cloudy condition");
    return {
      gradient: "from-gray-400 via-slate-500 to-gray-600",
      particles: "clouds",
      colors: ["#9ca3af", "#64748b", "#4b5563"],
    };
  }

  // Fog and atmospheric conditions
  else if (
    condition === "mist" ||
    condition === "fog" ||
    condition === "haze" ||
    condition === "smoke" ||
    condition === "dust" ||
    condition.includes("fog") ||
    condition.includes("mist") ||
    condition.includes("haze") ||
    condition.includes("smoke") ||
    condition.includes("dust")
  ) {
    console.log("🌫️ Matched atmospheric condition");
    return {
      gradient: "from-gray-300 via-blue-200 to-slate-400",
      particles: "fog",
      colors: ["#d1d5db", "#bfdbfe", "#94a3b8"],
    };
  }

  console.log("❓ No condition matched, using default blue theme");
  return {
    gradient: "from-blue-400 via-blue-500 to-blue-600",
    particles: "default",
    colors: ["#60a5fa", "#3b82f6", "#2563eb"],
  };
};

// Enhanced Rain particles component with realistic effects
const RainParticles = ({ count = 40 }: { count?: number }) => {
  const drops = Array.from({ length: count }, (_, i) => i);
  const splashes = Array.from({ length: 8 }, (_, i) => i);

  return (
    <>
      {/* Main rain drops with varying speeds and sizes */}
      {drops.map((drop) => {
        const size = 1 + Math.random() * 2;
        const speed = 0.8 + Math.random() * 0.7;
        const angle = Math.random() * 10 - 5; // Slight angle for wind effect

        return (
          <motion.div
            key={`rain-${drop}`}
            className="absolute bg-gradient-to-b from-blue-200/80 to-blue-400/60 rounded-full shadow-sm"
            style={{
              width: `${size}px`,
              height: `${12 + Math.random() * 8}px`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${angle}deg)`,
              filter: "blur(0.3px)",
            }}
            initial={{ y: -50, opacity: 0, scaleY: 0 }}
            animate={{
              y: "110vh",
              opacity: [0, 0.9, 0.7, 0],
              scaleY: [0, 1, 1, 0.8],
              x: angle * 20, // Wind drift effect
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeIn",
            }}
          />
        );
      })}

      {/* Splash effects at bottom */}
      {splashes.map((splash) => (
        <motion.div
          key={`splash-${splash}`}
          className="absolute w-1 h-1 bg-blue-300/40 rounded-full"
          style={{
            left: `${10 + splash * 10}%`,
            bottom: "5%",
          }}
          animate={{
            scale: [0, 4, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: splash * 0.5 + Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Rain atmosphere overlay */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%, 
            rgba(59, 130, 246, 0.1) 20%, 
            rgba(59, 130, 246, 0.2) 80%, 
            transparent 100%)`,
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

// Enhanced Snow particles component with wind effects and snowflake patterns
const SnowParticles = ({ count = 30 }: { count?: number }) => {
  const flakes = Array.from({ length: count }, (_, i) => i);
  const decorativeFlakes = Array.from({ length: 8 }, (_, i) => i);

  return (
    <>
      {/* Regular snowflakes */}
      {flakes.map((flake) => {
        const size = 2 + Math.random() * 4;
        const windOffset = (Math.random() - 0.5) * 150;
        return (
          <motion.div
            key={`snow-${flake}`}
            className="absolute bg-white rounded-full opacity-90 shadow-sm"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              filter: "blur(0.2px)",
            }}
            initial={{ y: -20, rotate: 0, x: 0 }}
            animate={{
              y: "110vh",
              rotate: [0, 180, 360, 540],
              x: [0, windOffset / 2, windOffset, windOffset / 2, 0],
              opacity: [0, 1, 1, 0.5, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          />
        );
      })}

      {/* Large decorative snowflakes with Unicode symbols */}
      {decorativeFlakes.map((flake) => (
        <motion.div
          key={`large-snow-${flake}`}
          className="absolute text-white opacity-70 select-none"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${16 + Math.random() * 8}px`,
          }}
          initial={{ y: -30, rotate: 0 }}
          animate={{
            y: "110vh",
            rotate: [0, 360],
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 50],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
        >
          ❄
        </motion.div>
      ))}

      {/* Snow accumulation at bottom */}
      <motion.div
        className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-white/20 to-transparent blur-sm"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

// Enhanced Lightning effect component with realistic thunder and lightning bolts
const LightningEffect = () => {
  const [flash, setFlash] = useState(false);
  const [lightningBolt, setLightningBolt] = useState(false);

  useEffect(() => {
    const createLightning = () => {
      // Main flash
      setFlash(true);
      setTimeout(() => setFlash(false), 150);

      // Secondary flash
      setTimeout(() => {
        setFlash(true);
        setTimeout(() => setFlash(false), 100);
      }, 300);

      // Lightning bolt effect
      setTimeout(() => {
        setLightningBolt(true);
        setTimeout(() => setLightningBolt(false), 200);
      }, 100);
    };

    const interval = setInterval(() => {
      createLightning();
    }, 4000 + Math.random() * 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Rain particles for thunderstorm */}
      <RainParticles count={35} />

      {/* Lightning flash */}
      <AnimatePresence>
        {flash && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-yellow-100/40 via-white/20 to-purple-100/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.3, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Lightning bolt */}
      <AnimatePresence>
        {lightningBolt && (
          <motion.div
            className="absolute top-0 left-1/2 w-1 bg-gradient-to-b from-yellow-300 via-white to-transparent"
            style={{
              height: "60%",
              transform: "translateX(-50%) rotate(15deg)",
              filter: "blur(1px)",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 1],
              x: [0, Math.random() * 40 - 20],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* Thunder clouds */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, 
            rgba(75, 85, 99, 0.4) 0%, 
            transparent 50%),
            radial-gradient(ellipse at 70% 30%, 
            rgba(55, 65, 81, 0.3) 0%, 
            transparent 60%)`,
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

// Enhanced Sun rays component with dynamic lighting and pulsing glow
const SunRays = () => {
  const rays = Array.from({ length: 8 }, (_, i) => i);
  const heatWaves = Array.from({ length: 4 }, (_, i) => i);

  return (
    <>
      {/* Animated sun rays */}
      {rays.map((ray) => (
        <motion.div
          key={`sun-${ray}`}
          className="absolute bg-gradient-radial from-yellow-300/30 via-orange-300/20 to-transparent rounded-full blur-xl"
          style={{
            width: `${80 + ray * 20}px`,
            height: `${80 + ray * 20}px`,
            top: `${5 + ray * 3}%`,
            right: `${2 + ray * 4}%`,
            filter: `blur(${2 + ray * 0.5}px)`,
          }}
          animate={{
            scale: [1, 1.3, 1.1, 1],
            opacity: [0.2, 0.8, 0.4, 0.2],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 4 + ray * 0.8,
            repeat: Infinity,
            delay: ray * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Central bright sun core */}
      <motion.div
        className="absolute w-24 h-24 bg-gradient-radial from-yellow-200/60 via-yellow-300/40 to-transparent rounded-full blur-lg"
        style={{
          top: "15%",
          right: "15%",
          filter: "blur(3px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Heat shimmer effects */}
      {heatWaves.map((wave) => (
        <motion.div
          key={`heat-${wave}`}
          className="absolute w-full opacity-10"
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
            top: `${40 + wave * 15}%`,
          }}
          animate={{
            x: [-100, 100],
            opacity: [0, 0.3, 0],
            scaleX: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + wave * 0.5,
            repeat: Infinity,
            delay: wave * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Warm ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 85% 20%, 
            rgba(251, 191, 36, 0.1) 0%, 
            rgba(245, 158, 11, 0.05) 40%, 
            transparent 70%)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

// Enhanced Floating clouds component with 3D depth and realistic movement
const FloatingClouds = ({ count = 6 }: { count?: number }) => {
  const clouds = Array.from({ length: count }, (_, i) => i);
  const wisps = Array.from({ length: 10 }, (_, i) => i);

  return (
    <>
      {/* Main cloud formations */}
      {clouds.map((cloud) => {
        const size = 60 + Math.random() * 80;
        const depth = Math.random();
        return (
          <motion.div
            key={`cloud-${cloud}`}
            className="absolute rounded-full opacity-60"
            style={{
              width: `${size}px`,
              height: `${size * 0.6}px`,
              top: `${5 + cloud * 12}%`,
              left: `${Math.random() * 90}%`,
              background: `radial-gradient(ellipse at 30% 30%, 
                rgba(255, 255, 255, ${0.3 + depth * 0.4}), 
                rgba(255, 255, 255, ${0.1 + depth * 0.2}))`,
              filter: `blur(${2 + depth * 3}px)`,
              transform: `scale(${0.7 + depth * 0.6})`,
            }}
            animate={{
              x: [0, 50 + depth * 30, 20, 0],
              y: [0, -15 + depth * 10, -5, 0],
              scale: [
                0.7 + depth * 0.6,
                0.9 + depth * 0.4,
                0.8 + depth * 0.5,
                0.7 + depth * 0.6,
              ],
              opacity: [
                0.4 + depth * 0.3,
                0.7 + depth * 0.2,
                0.5 + depth * 0.3,
                0.4 + depth * 0.3,
              ],
            }}
            transition={{
              duration: 12 + cloud * 3 + depth * 8,
              repeat: Infinity,
              delay: cloud * 2,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Small cloud wisps for detail */}
      {wisps.map((wisp) => (
        <motion.div
          key={`wisp-${wisp}`}
          className="absolute bg-white/20 rounded-full blur-sm"
          style={{
            width: `${15 + Math.random() * 25}px`,
            height: `${8 + Math.random() * 12}px`,
            top: `${Math.random() * 70}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 80, 40, 0],
            y: [0, -20, -10, 0],
            opacity: [0.2, 0.5, 0.3, 0.2],
            scale: [1, 1.3, 1.1, 1],
          }}
          transition={{
            duration: 15 + wisp * 2,
            repeat: Infinity,
            delay: wisp * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Cloud shadows for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 40% 30%, 
            rgba(0, 0, 0, 0.05) 0%, 
            transparent 60%),
            radial-gradient(ellipse at 80% 50%, 
            rgba(0, 0, 0, 0.03) 0%, 
            transparent 50%)`,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

// Enhanced Fog layers component with realistic density variations
const FogLayers = () => {
  const layers = Array.from({ length: 8 }, (_, i) => i);
  const driftingMist = Array.from({ length: 5 }, (_, i) => i);

  return (
    <>
      {/* Main fog layers with varying density */}
      {layers.map((layer) => {
        const density = Math.random() * 0.4 + 0.1;
        const height = 8 + layer * 4;
        return (
          <motion.div
            key={`fog-${layer}`}
            className="absolute w-full blur-xl"
            style={{
              height: `${height}%`,
              top: `${layer * 8}%`,
              background: `linear-gradient(90deg, 
                rgba(200, 200, 200, ${density * 0.5}), 
                rgba(220, 220, 220, ${density}), 
                rgba(200, 200, 200, ${density * 0.3}))`,
            }}
            animate={{
              opacity: [
                density * 0.3,
                density * 0.8,
                density * 0.5,
                density * 0.3,
              ],
              scale: [1, 1.2, 1.1, 1],
              x: [0, 30 + layer * 5, 15, 0],
            }}
            transition={{
              duration: 8 + layer * 2,
              repeat: Infinity,
              delay: layer * 1.2,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Drifting mist particles */}
      {driftingMist.map((mist) => (
        <motion.div
          key={`mist-${mist}`}
          className="absolute rounded-full blur-lg opacity-30"
          style={{
            width: `${40 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 30}px`,
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            background: `radial-gradient(ellipse, 
              rgba(255, 255, 255, 0.4), 
              rgba(200, 200, 200, 0.2), 
              transparent)`,
          }}
          animate={{
            x: [0, 100 + mist * 20, 50, 0],
            y: [0, -20, -10, 0],
            opacity: [0.1, 0.4, 0.2, 0.1],
            scale: [1, 1.4, 1.2, 1],
          }}
          transition={{
            duration: 12 + mist * 3,
            repeat: Infinity,
            delay: mist * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Atmospheric depth effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            rgba(255, 255, 255, 0.05) 0%, 
            rgba(200, 200, 200, 0.1) 30%, 
            rgba(180, 180, 180, 0.15) 70%, 
            rgba(160, 160, 160, 0.1) 100%)`,
        }}
        animate={{
          opacity: [0.3, 0.7, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

// Animated gradient background using React Spring
// Memoized AnimatedGradient to prevent restart on parent re-renders
const AnimatedGradient = memo(({ colors }: { colors: string[] }) => {
  const [colorIndex, setColorIndex] = useState(0);

  const styles = useSpring({
    background: `linear-gradient(135deg, ${
      colors[colorIndex % colors.length]
    }, ${colors[(colorIndex + 1) % colors.length]}, ${
      colors[(colorIndex + 2) % colors.length]
    })`,
    config: { duration: 8000 }, // Slower animation - 8 seconds instead of 3
    onRest: () => {
      setTimeout(
        () => setColorIndex((prev) => (prev + 1) % colors.length),
        2000 // Longer pause between transitions
      );
    },
  });

  return (
    <animated.div style={styles} className="absolute inset-0 opacity-40" />
  );
});

AnimatedGradient.displayName = "AnimatedGradient";

// Enhanced particle renderer with optimized counts
const renderWeatherParticles = (particleType: string) => {
  switch (particleType) {
    case "rain":
      return <RainParticles count={40} />;
    case "snow":
      return <SnowParticles count={30} />;
    case "lightning":
      return <LightningEffect />;
    case "sunny":
      return <SunRays />;
    case "clouds":
      return <FloatingClouds count={6} />;
    case "fog":
      return <FogLayers />;
    default:
      return <FloatingClouds count={4} />;
  }
};

export const DynamicBackground = memo(({ weather }: DynamicBackgroundProps) => {
  const [currentTheme, setCurrentTheme] = useState(getWeatherTheme("clear"));

  useEffect(() => {
    console.log("🌍 Weather data received:", weather);
    if (weather && weather.weather && weather.weather.length > 0) {
      console.log("🌍 Weather description:", weather.weather[0].description);
      console.log("🌍 Weather main:", weather.weather[0].main);
      // Use the main property for more reliable matching, fall back to description
      const condition =
        weather.weather[0].main || weather.weather[0].description;
      setCurrentTheme(getWeatherTheme(condition));
    } else {
      console.log("🌍 No weather data, using default clear theme");
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
});

DynamicBackground.displayName = "DynamicBackground";
