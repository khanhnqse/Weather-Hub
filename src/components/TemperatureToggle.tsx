"use client";

import { motion } from "framer-motion";

interface TemperatureToggleProps {
  unit: "celsius" | "fahrenheit";
  onToggle: (unit: "celsius" | "fahrenheit") => void;
}

export const TemperatureToggle = ({
  unit,
  onToggle,
}: TemperatureToggleProps) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-white/80 text-sm font-medium">
        Đơn vị nhiệt độ:
      </span>
      <div className="relative bg-white/10 backdrop-blur-lg rounded-full p-1 border border-white/20">
        <motion.div
          className="absolute top-1 bottom-1 bg-white/30 backdrop-blur-sm rounded-full"
          style={{
            width: "calc(50% - 4px)",
          }}
          initial={false}
          animate={{
            x: unit === "celsius" ? 2 : "calc(100% + 2px)",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        <div className="relative flex">
          <button
            onClick={() => onToggle("celsius")}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
              unit === "celsius"
                ? "text-white"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            °C
          </button>
          <button
            onClick={() => onToggle("fahrenheit")}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
              unit === "fahrenheit"
                ? "text-white"
                : "text-white/60 hover:text-white/80"
            }`}
          >
            °F
          </button>
        </div>
      </div>
    </div>
  );
};
