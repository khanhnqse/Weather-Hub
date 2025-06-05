"use client";

import { useState } from "react";
import { WeatherData } from "@/types/weather";
import { AppHeader } from "./AppHeader";
import { SearchForm } from "./SearchForm";
import { ErrorMessage } from "./ErrorMessage";
import { WeatherDisplay } from "./WeatherDisplay";
import { DynamicBackground } from "./DynamicBackground";
import { ForecastChart } from "./ForecastChart";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Vui lòng nhập tên thành phố");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error(
          "API key not found. Please check your environment variables."
        );
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric&lang=vi`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            "Không tìm thấy thành phố. Vui lòng kiểm tra tên thành phố."
          );
        }
        throw new Error("Đã xảy ra lỗi khi lấy dữ liệu thời tiết.");
      }

      const data: WeatherData = await response.json();
      setWeather(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather();
  };
  return (
    <>
      {/* Dynamic weather background */}
      <DynamicBackground weather={weather} />

      {/* Main content with relative positioning to appear above background */}
      <div className="relative z-10">
        <AppHeader />

        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 animate-scaleIn">
          <SearchForm
            city={city}
            setCity={setCity}
            onSubmit={handleSubmit}
            loading={loading}
          />{" "}
          {error && <ErrorMessage error={error} />}
          {weather && <WeatherDisplay weather={weather} />}
        </div>

        {/* 5-day forecast chart - only show when we have weather data */}
        {weather && (
          <div className="mb-8">
            <ForecastChart city={city} />
          </div>
        )}
      </div>
    </>
  );
}
