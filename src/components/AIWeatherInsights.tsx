"use client";

import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { WeatherData } from "@/types/weather";
import { WeatherInsight, createAIWeatherService } from "@/utils/aiService";

interface AIWeatherInsightsProps {
  weather: WeatherData;
}

export function AIWeatherInsights({ weather }: AIWeatherInsightsProps) {
  const [insights, setInsights] = useState<WeatherInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const generateInsights = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const aiService = createAIWeatherService();
      const newInsights = await aiService.generateInsights(weather);
      setInsights(newInsights);
    } catch (err) {
      setError("Không thể tạo gợi ý AI. Vui lòng thử lại sau.");
      console.error("AI insights error:", err);
    } finally {
      setLoading(false);
    }
  }, [weather]);

  useEffect(() => {
    if (weather) {
      generateInsights();
    }
  }, [weather, generateInsights]);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="animate-spin">🤖</div>
          <h3 className="text-white text-lg font-semibold">
            AI đang phân tích...
          </h3>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white/20 rounded-lg h-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30">
        <h3 className="text-red-200 text-lg font-semibold mb-2">⚠️ Lỗi AI</h3>
        <p className="text-red-100 text-sm mb-4">{error}</p>
        <button
          onClick={generateInsights}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (insights.length === 0) {
    return null;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-400/40 bg-red-500/20";
      case "medium":
        return "border-yellow-400/40 bg-yellow-500/20";
      case "low":
        return "border-blue-400/40 bg-blue-500/20";
      default:
        return "border-gray-400/40 bg-gray-500/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "outfit":
        return "👕";
      case "activity":
        return "🏃";
      case "health":
        return "💊";
      case "travel":
        return "🚗";
      default:
        return "💡";
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🤖</span>
          <h3 className="text-white text-lg font-semibold">Gợi ý từ AI</h3>
        </div>
        <button
          onClick={generateInsights}
          className="text-white/60 hover:text-white transition-colors text-sm"
          title="Tạo gợi ý mới"
        >
          🔄
        </button>
      </div>

      <div className="grid gap-4">
        {insights
          .sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return (
              priorityOrder[b.priority as keyof typeof priorityOrder] -
              priorityOrder[a.priority as keyof typeof priorityOrder]
            );
          })
          .map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-xl border backdrop-blur-sm ${getPriorityColor(
                insight.priority
              )}`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl flex-shrink-0">
                  {insight.icon || getTypeIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-white font-medium">{insight.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        insight.priority === "high"
                          ? "bg-red-500/30 text-red-200"
                          : insight.priority === "medium"
                          ? "bg-yellow-500/30 text-yellow-200"
                          : "bg-blue-500/30 text-blue-200"
                      }`}
                    >
                      {insight.priority === "high"
                        ? "Quan trọng"
                        : insight.priority === "medium"
                        ? "Trung bình"
                        : "Thông tin"}
                    </span>{" "}
                  </div>
                  <div className="text-white/80 text-sm leading-relaxed prose prose-sm prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-white font-semibold">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="text-yellow-200">{children}</em>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-1">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="text-white/80">{children}</li>
                        ),
                      }}
                    >
                      {insight.description}
                    </ReactMarkdown>
                  </div>
                  {insight.confidence && (
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-white/60 text-xs">Độ tin cậy:</span>
                      <div className="flex-1 bg-white/20 rounded-full h-1.5">
                        <div
                          className="bg-green-400 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${insight.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white/60 text-xs">
                        {Math.round(insight.confidence * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
