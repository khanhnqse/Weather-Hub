"use client";

import { useState } from "react";

interface WeatherData {
  name: string;
  country?: string;
  weather: {
    description: string;
    main: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg?: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
}

export default function Home() {
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl mb-6 shadow-2xl animate-float">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
              Weather<span className="text-blue-300">Hub</span>
            </h1>
            <p className="text-white/70 text-lg font-medium">
              Khám phá thời tiết toàn cầu
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 animate-scaleIn">
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-white/60 transition-colors group-focus-within:text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Tìm kiếm thành phố..."
                  className="w-full pl-12 pr-32 py-4 bg-white/20 backdrop-blur-lg border border-white/30 text-white placeholder-white/60 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 text-lg hover:bg-white/25 focus:bg-white/25"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 font-semibold transform hover:scale-105 active:scale-95"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <span className="hidden sm:inline">Tìm</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-lg border border-red-400/30 text-red-100 rounded-2xl animate-scaleIn">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-red-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {weather && (
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 animate-scaleIn">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <svg
                      className="w-6 h-6 text-white/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <h2 className="text-2xl font-bold text-white">
                      {weather.name}
                    </h2>
                  </div>

                  <div className="mb-6">
                    <div className="text-7xl font-black text-white mb-2 drop-shadow-lg animate-fadeInUp">
                      {Math.round(weather.main.temp)}°
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                      <p className="text-white/90 capitalize text-lg font-medium">
                        {weather.weather[0].description}
                      </p>
                    </div>
                  </div>

                  {/* Temperature Range */}
                  <div className="mb-6 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-white/70 text-sm font-medium mb-1">
                          Thấp nhất
                        </p>
                        <p className="text-lg font-bold text-blue-300">
                          {Math.round(weather.main.temp_min)}°
                        </p>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-red-400 rounded-full"></div>
                      </div>
                      <div className="text-center">
                        <p className="text-white/70 text-sm font-medium mb-1">
                          Cao nhất
                        </p>
                        <p className="text-lg font-bold text-red-300">
                          {Math.round(weather.main.temp_max)}°
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <p className="text-white/70 text-sm font-medium">
                          Cảm giác như
                        </p>
                      </div>
                      <p className="text-xl font-bold text-white">
                        {Math.round(weather.main.feels_like)}°C
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"
                          />
                        </svg>
                        <p className="text-white/70 text-sm font-medium">
                          Độ ẩm
                        </p>
                      </div>
                      <p className="text-xl font-bold text-white">
                        {weather.main.humidity}%
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10l1 1v16l-1 1H6l-1-1V5l1-1z"
                          />
                        </svg>
                        <p className="text-white/70 text-sm font-medium">
                          Tốc độ gió
                        </p>
                      </div>
                      <p className="text-xl font-bold text-white">
                        {weather.wind.speed} m/s
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        <p className="text-white/70 text-sm font-medium">
                          Áp suất
                        </p>
                      </div>
                      <p className="text-xl font-bold text-white">
                        {weather.main.pressure} hPa
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <p className="text-white/70 text-sm font-medium">
                          Tầm nhìn
                        </p>
                      </div>
                      <p className="text-xl font-bold text-white">
                        {weather.visibility
                          ? `${(weather.visibility / 1000).toFixed(1)} km`
                          : "N/A"}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-blue-300 group-hover:text-blue-200 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.002 4.002 0 003 15z"
                          />
                        </svg>
                        <p className="text-white/70 text-sm font-medium">
                          Độ phủ mây
                        </p>
                      </div>
                      <p className="text-xl font-bold text-white">
                        {weather.clouds.all}%
                      </p>
                    </div>
                  </div>

                  {/* Sunrise and Sunset */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-yellow-300 group-hover:text-yellow-200 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        <p className="text-white/70 text-sm font-medium">
                          Bình minh
                        </p>
                      </div>
                      <p className="text-xl font-bold text-white">
                        {new Date(
                          weather.sys.sunrise * 1000
                        ).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-orange-300 group-hover:text-orange-200 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                        <p className="text-white/70 text-sm font-medium">
                          Hoàng hôn
                        </p>
                      </div>
                      <p className="text-xl font-bold text-white">
                        {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                          "vi-VN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center">
            <p className="text-white/60 text-sm font-medium">
              Dữ liệu thời tiết được cung cấp bởi
              <span className="text-blue-300 font-semibold">
                {" "}
                OpenWeatherMap
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
