"use client";

import { useState, useEffect } from "react";

interface RealTimeClockProps {
  timezone: number; // Timezone offset in seconds from UTC
  cityName: string;
}

export const RealTimeClock = ({ timezone, cityName }: RealTimeClockProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      // Get current UTC time
      const now = new Date();

      // Calculate local time in the city using timezone offset
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const cityTime = new Date(utcTime + timezone * 1000);

      // Format time (24-hour format)
      const timeString = cityTime.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      // Format date
      const dateString = cityTime.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    // Update time immediately
    updateTime();

    // Update time every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="mb-6 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <svg
          className="w-5 h-5 text-yellow-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-white/70 text-sm font-medium">
          Thời gian tại {cityName}
        </p>
      </div>

      <div className="text-3xl font-bold text-white mb-2 font-mono tracking-wider">
        {currentTime}
      </div>

      <div className="text-white/60 text-sm capitalize">{currentDate}</div>
    </div>
  );
};
