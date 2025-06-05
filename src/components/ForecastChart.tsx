"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Image from "next/image";
import { ForecastData, ForecastItem } from "@/types/weather";
import { TemperatureUnit, getTemperatureInUnit } from "@/utils/temperature";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ForecastChartProps {
  city: string;
  temperatureUnit: TemperatureUnit;
}

interface DailyForecast {
  date: string;
  day: string;
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
  humidity: number;
  precipitation: number;
  weather: string;
  icon: string;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ city, temperatureUnit }) => {
  const [forecastData, setForecastData] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Process forecast data into daily summaries
  const processForecastData = useCallback((
    forecastList: ForecastItem[]
  ): DailyForecast[] => {
    const dailyData: { [key: string]: ForecastItem[] } = {};

    // Group forecast items by date
    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toISOString().split("T")[0];

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = [];
      }
      dailyData[dateKey].push(item);
    });

    // Convert to daily summaries (limit to 5 days)
    return Object.entries(dailyData)
      .slice(0, 5)
      .map(([date, items]) => {
        const temps = items.map((item) => item.main.temp);
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);
        const avgTemp =
          temps.reduce((sum, temp) => sum + temp, 0) / temps.length;

        const humidity =
          items.reduce((sum, item) => sum + item.main.humidity, 0) /
          items.length;
        const precipitation = Math.max(...items.map((item) => item.pop * 100));

        // Get the most common weather condition
        const weatherCounts: { [key: string]: number } = {};
        let mostCommonWeather = items[0].weather[0];
        items.forEach((item) => {
          const weather = item.weather[0].main;
          weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
        });

        const mostCommon = Object.entries(weatherCounts).reduce((a, b) =>
          a[1] > b[1] ? a : b
        );

        const weatherItem = items.find(
          (item) => item.weather[0].main === mostCommon[0]
        );
        if (weatherItem) {
          mostCommonWeather = weatherItem.weather[0];
        }

        const dateObj = new Date(date);
        const day = dateObj.toLocaleDateString("vi-VN", { weekday: "short" });
        
        return {
          date,
          day,
          minTemp: Math.round(getTemperatureInUnit(minTemp, temperatureUnit)),
          maxTemp: Math.round(getTemperatureInUnit(maxTemp, temperatureUnit)),
          avgTemp: Math.round(getTemperatureInUnit(avgTemp, temperatureUnit)),
          humidity: Math.round(humidity),
          precipitation: Math.round(precipitation),
          weather: mostCommonWeather.description,
          icon: mostCommonWeather.icon,
        };
      });
  }, [temperatureUnit]);

  // Fetch 5-day forecast data
  const fetchForecast = useCallback(async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error("API key not found");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric&lang=vi`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }

      const data: ForecastData = await response.json();

      // Process forecast data to get daily summaries
      const dailyForecasts = processForecastData(data.list);
      setForecastData(dailyForecasts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }  }, [city, processForecastData]);

  // Fetch forecast when city changes
  useEffect(() => {
    if (city) {
      fetchForecast();
    }
  }, [city, fetchForecast]);
  // Get temperature unit symbol
  const unitSymbol = temperatureUnit === 'celsius' ? '°C' : '°F';

  // Chart configuration
  const chartData = {
    labels: forecastData.map((day) => day.day),
    datasets: [
      {
        label: `Nhiệt độ tối đa (${unitSymbol})`,
        data: forecastData.map((day) => day.maxTemp),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "rgb(239, 68, 68)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: `Nhiệt độ tối thiểu (${unitSymbol})`,
        data: forecastData.map((day) => day.minTemp),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: "Độ ẩm (%)",
        data: forecastData.map((day) => day.humidity),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "rgb(34, 197, 94)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        yAxisID: "y1",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Dự báo thời tiết 5 ngày",
        color: "white",
        font: {
          size: 16,
          weight: "bold" as const,
        },
        padding: 20,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          afterBody: (context: TooltipItem<"line">[]) => {
            const dataIndex = context[0].dataIndex;
            const day = forecastData[dataIndex];
            return [
              `Thời tiết: ${day.weather}`,
              `Khả năng mưa: ${day.precipitation}%`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "white",
          font: {
            size: 12,
          },          callback: function (value: string | number) {
            return value + unitSymbol;
          },
        },        title: {
          display: true,
          text: `Nhiệt độ (${unitSymbol})`,
          color: "white",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
          callback: function (value: string | number) {
            return value + "%";
          },
        },
        title: {
          display: true,
          text: "Độ ẩm (%)",
          color: "white",
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Đang tải dự báo thời tiết...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 text-center">
        <p className="text-red-300">❌ {error}</p>
      </div>
    );
  }

  if (forecastData.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-6 animate-slideInUp">
      {/* Chart */}
      <div className="h-80 mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Daily forecast cards */}
      <div className="grid grid-cols-5 gap-3">
        {forecastData.map((day, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/30 hover:bg-white/25 transition-all duration-300"
          >
            <div className="text-white/80 text-sm font-medium mb-2">
              {day.day}
            </div>{" "}
            <div className="mb-3">
              <Image
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.weather}
                width={48}
                height={48}
                className="mx-auto"
              />
            </div>            <div className="text-white text-lg font-bold mb-1">
              {day.maxTemp}{unitSymbol.charAt(0)}
            </div>
            <div className="text-white/70 text-sm mb-2">{day.minTemp}{unitSymbol.charAt(0)}</div>
            <div className="text-white/60 text-xs">
              <div>💧 {day.humidity}%</div>
              {day.precipitation > 0 && <div>🌧️ {day.precipitation}%</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
