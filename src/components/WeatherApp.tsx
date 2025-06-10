"use client";

import { useState } from "react";
import { WeatherData } from "@/types/weather";
import { AppHeader } from "./AppHeader";
import { SearchForm } from "./SearchForm";
import { ErrorMessage } from "./ErrorMessage";
import { WeatherDisplay } from "./WeatherDisplay";
import { DynamicBackground } from "./DynamicBackground";
import { ForecastChart } from "./ForecastChart";
import { TemperatureToggle } from "./TemperatureToggle";
import { TemperatureUnit } from "@/utils/temperature";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { WeatherAlerts } from "./WeatherAlerts";
import { AIWeatherInsights } from "./AIWeatherInsights";
import { AIWeatherChat } from "./AIWeatherChat";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("celsius");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [locationDenied, setLocationDenied] = useState(false);

  // Recent searches functionality
  const { recentSearches, addRecentSearch, clearRecentSearches } =
    useRecentSearches();

  // Fetch weather by coordinates (for geolocation)
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`
      );

      if (!response.ok) {
        throw new Error("Đã xảy ra lỗi khi lấy dữ liệu thời tiết.");
      }

      const data: WeatherData = await response.json();
      setWeather(data);
      setSearchedCity(data.name); // Use the city name from API response
      setCity(data.name); // Set the input field to show current location
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định"
      );
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };
  // Get user's current location when requested
  const requestLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      setShowLocationPrompt(false);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.log("Geolocation error:", error);
          setError(
            "Không thể lấy vị trí hiện tại. Vui lòng nhập tên thành phố để tìm kiếm."
          );
          setLocationDenied(true);
          setLoading(false);
          setIsInitialLoad(false);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
          maximumAge: 300000, // 5 minutes
        }
      );
    } else {
      setError(
        "Trình duyệt không hỗ trợ geolocation. Vui lòng nhập tên thành phố để tìm kiếm."
      );
      setLocationDenied(true);
      setIsInitialLoad(false);
    }
  };

  // Skip location prompt and go to manual search
  const skipLocation = () => {
    setShowLocationPrompt(false);
    setIsInitialLoad(false);
  };

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
      setSearchedCity(city); // Set the searched city only after successful weather fetch
      addRecentSearch(city); // Add to recent searches on successful fetch
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
  // Handle selecting a recent search
  const handleRecentSearchSelect = (selectedCity: string) => {
    setCity(selectedCity);
    // We'll let the user submit manually or auto-submit
    setError("");
  };
  return (
    <>
      {/* Dynamic weather background */}
      <DynamicBackground weather={weather} />
      {/* Main content with relative positioning to appear above background */}{" "}
      <div className="relative z-10">
        <AppHeader />        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 animate-scaleIn">
          {" "}
          {/* Temperature Unit Toggle */}
          <TemperatureToggle
            unit={temperatureUnit}
            onToggle={setTemperatureUnit}
          />
          {/* Show location permission prompt on initial load */}
          {isInitialLoad && showLocationPrompt && !loading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-6 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <h3 className="text-white text-xl font-bold mb-3">
                Cho phép truy cập vị trí?
              </h3>
              <p className="text-white/80 text-sm mb-6 max-w-md mx-auto leading-relaxed">
                Chúng tôi có thể hiển thị thời tiết cho vị trí hiện tại của bạn,
                hoặc bạn có thể tìm kiếm thành phố bất kỳ.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={requestLocation}
                  className="px-6 py-3 bg-blue-300 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  📍 Sử dụng vị trí hiện tại
                </button>
                <button
                  onClick={skipLocation}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/30"
                >
                  🔍 Tìm kiếm thành phố
                </button>
              </div>
            </div>
          )}
          {/* Show location loading message */}
          {isInitialLoad && loading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white animate-spin"
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
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">
                Đang xác định vị trí của bạn...
              </h3>
              <p className="text-white/70 text-sm">
                Chúng tôi đang lấy thông tin thời tiết cho vị trí hiện tại của
                bạn
              </p>
            </div>
          )}{" "}
          {/* Show search form after initial load is complete */}
          {!isInitialLoad && (
            <SearchForm
              city={city}
              setCity={setCity}
              onSubmit={handleSubmit}
              loading={loading}
              recentSearches={recentSearches}
              onSearchSelect={handleRecentSearchSelect}
              onClearRecentSearches={clearRecentSearches}
              onLocationRequest={requestLocation}
              locationDenied={locationDenied}
            />
          )}
          {/* Show errors */}
          {error && !loading && <ErrorMessage error={error} />}{" "}
          {weather && (
            <WeatherDisplay
              weather={weather}
              temperatureUnit={temperatureUnit}
            />
          )}{" "}
          {/* Weather alerts - show when we have weather data */}
          {weather && (
            <div className="mt-6">
              <WeatherAlerts weather={weather} />
            </div>
          )}
          {/* AI Weather Insights */}
          {weather && (
            <div className="mt-6">
              <AIWeatherInsights weather={weather} />
            </div>
          )}
        </div>{" "}
        {/* 5-day forecast chart - only show when we have weather data */}{" "}
        {weather && searchedCity && (
          <div className="mb-8">
            <ForecastChart
              city={searchedCity}
              temperatureUnit={temperatureUnit}
            />
          </div>
        )}
        {/* AI Weather Chat */}
        {weather && (
          <div className="mb-8">
            <AIWeatherChat weather={weather} />
          </div>
        )}
      </div>
    </>
  );
}
