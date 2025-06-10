import { WeatherData } from "@/types/weather";

export interface WeatherAlert {
  id: string;
  type: "temperature" | "wind" | "humidity" | "visibility" | "general";
  severity: "low" | "medium" | "high" | "extreme";
  title: string;
  message: string;
  icon: string;
  color: string;
  timestamp: number;
}

export interface AlertThresholds {
  temperature: {
    extreme_hot: number; // °C
    very_hot: number;
    extreme_cold: number;
    very_cold: number;
  };
  wind: {
    high: number; // m/s
    extreme: number;
  };
  humidity: {
    very_low: number; // %
    very_high: number;
  };
  visibility: {
    poor: number; // km
    very_poor: number;
  };
}

// Default alert thresholds
const DEFAULT_THRESHOLDS: AlertThresholds = {
  temperature: {
    extreme_hot: 40,
    very_hot: 35,
    extreme_cold: -10,
    very_cold: 0,
  },
  wind: {
    high: 15,
    extreme: 25,
  },
  humidity: {
    very_low: 20,
    very_high: 90,
  },
  visibility: {
    poor: 1,
    very_poor: 0.5,
  },
};

/**
 * Generate weather alerts based on current weather conditions
 */
export const generateWeatherAlerts = (
  weather: WeatherData,
  thresholds: AlertThresholds = DEFAULT_THRESHOLDS
): WeatherAlert[] => {
  const alerts: WeatherAlert[] = [];
  const timestamp = Date.now();

  // Temperature alerts
  const temp = weather.main.temp;
  if (temp >= thresholds.temperature.extreme_hot) {
    alerts.push({
      id: `temp-extreme-hot-${timestamp}`,
      type: "temperature",
      severity: "extreme",
      title: "🔥 Cảnh báo nhiệt độ cực cao!",
      message: `Nhiệt độ ${temp.toFixed(1)}°C rất nguy hiểm. Hạn chế ra ngoài, uống nhiều nước và tìm chỗ mát.`,
      icon: "🔥",
      color: "text-red-500",
      timestamp,
    });
  } else if (temp >= thresholds.temperature.very_hot) {
    alerts.push({
      id: `temp-very-hot-${timestamp}`,
      type: "temperature",
      severity: "high",
      title: "🌡️ Cảnh báo nắng nóng",
      message: `Nhiệt độ ${temp.toFixed(1)}°C rất cao. Nên ở trong nhà và uống nhiều nước.`,
      icon: "🌡️",
      color: "text-orange-500",
      timestamp,
    });
  }

  if (temp <= thresholds.temperature.extreme_cold) {
    alerts.push({
      id: `temp-extreme-cold-${timestamp}`,
      type: "temperature",
      severity: "extreme",
      title: "🥶 Cảnh báo lạnh cực độ!",
      message: `Nhiệt độ ${temp.toFixed(1)}°C cực kỳ lạnh. Mặc ấm và hạn chế ra ngoài.`,
      icon: "🥶",
      color: "text-blue-500",
      timestamp,
    });
  } else if (temp <= thresholds.temperature.very_cold) {
    alerts.push({
      id: `temp-very-cold-${timestamp}`,
      type: "temperature",
      severity: "high",
      title: "❄️ Cảnh báo lạnh giá",
      message: `Nhiệt độ ${temp.toFixed(1)}°C rất lạnh. Mặc ấm khi ra ngoài.`,
      icon: "❄️",
      color: "text-blue-400",
      timestamp,
    });
  }

  // Wind alerts
  const windSpeed = weather.wind.speed;
  if (windSpeed >= thresholds.wind.extreme) {
    alerts.push({
      id: `wind-extreme-${timestamp}`,
      type: "wind",
      severity: "extreme",
      title: "💨 Cảnh báo gió cực mạnh!",
      message: `Tốc độ gió ${windSpeed.toFixed(1)} m/s rất nguy hiểm. Tránh ra ngoài và cẩn thận với vật bay.`,
      icon: "💨",
      color: "text-purple-500",
      timestamp,
    });
  } else if (windSpeed >= thresholds.wind.high) {
    alerts.push({
      id: `wind-high-${timestamp}`,
      type: "wind",
      severity: "medium",
      title: "🌬️ Cảnh báo gió mạnh",
      message: `Tốc độ gió ${windSpeed.toFixed(1)} m/s khá mạnh. Cẩn thận khi di chuyển.`,
      icon: "🌬️",
      color: "text-gray-500",
      timestamp,
    });
  }

  // Humidity alerts
  const humidity = weather.main.humidity;
  if (humidity <= thresholds.humidity.very_low) {
    alerts.push({
      id: `humidity-low-${timestamp}`,
      type: "humidity",
      severity: "medium",
      title: "🏜️ Độ ẩm rất thấp",
      message: `Độ ẩm ${humidity}% rất thấp. Uống nhiều nước và sử dụng kem dưỡng ẩm.`,
      icon: "🏜️",
      color: "text-yellow-500",
      timestamp,
    });
  } else if (humidity >= thresholds.humidity.very_high) {
    alerts.push({
      id: `humidity-high-${timestamp}`,
      type: "humidity",
      severity: "medium",
      title: "💧 Độ ẩm rất cao",
      message: `Độ ẩm ${humidity}% rất cao. Có thể cảm thấy ngột ngạt và khó chịu.`,
      icon: "💧",
      color: "text-cyan-500",
      timestamp,
    });
  }

  // Visibility alerts
  if (weather.visibility) {
    const visibilityKm = weather.visibility / 1000;
    if (visibilityKm <= thresholds.visibility.very_poor) {
      alerts.push({
        id: `visibility-very-poor-${timestamp}`,
        type: "visibility",
        severity: "high",
        title: "🌫️ Tầm nhìn rất kém!",
        message: `Tầm nhìn chỉ ${visibilityKm.toFixed(1)} km. Cực kỳ nguy hiểm khi lái xe.`,
        icon: "🌫️",
        color: "text-gray-600",
        timestamp,
      });
    } else if (visibilityKm <= thresholds.visibility.poor) {
      alerts.push({
        id: `visibility-poor-${timestamp}`,
        type: "visibility",
        severity: "medium",
        title: "🌁 Tầm nhìn kém",
        message: `Tầm nhìn ${visibilityKm.toFixed(1)} km. Cẩn thận khi lái xe.`,
        icon: "🌁",
        color: "text-gray-500",
        timestamp,
      });
    }
  }

  // Weather condition specific alerts
  const condition = weather.weather[0].main.toLowerCase();
  if (condition.includes("thunderstorm")) {
    alerts.push({
      id: `thunderstorm-${timestamp}`,
      type: "general",
      severity: "high",
      title: "⛈️ Cảnh báo bão",
      message: "Có bão với sấm sét. Ở trong nhà và tránh xa cửa sổ.",
      icon: "⛈️",
      color: "text-indigo-600",
      timestamp,
    });
  }

  if (condition.includes("snow")) {
    alerts.push({
      id: `snow-${timestamp}`,
      type: "general",
      severity: "medium",
      title: "🌨️ Cảnh báo tuyết",
      message: "Có tuyết rơi. Đường có thể trơn trượt, cẩn thận khi di chuyển.",
      icon: "🌨️",
      color: "text-blue-300",
      timestamp,
    });
  }

  if (condition.includes("fog") || condition.includes("mist")) {
    alerts.push({
      id: `fog-${timestamp}`,
      type: "general",
      severity: "medium",
      title: "🌫️ Cảnh báo sương mù",
      message: "Có sương mù dày đặc. Tầm nhìn hạn chế, lái xe cẩn thận.",
      icon: "🌫️",
      color: "text-gray-400",
      timestamp,
    });
  }

  return alerts;
};

/**
 * Get alert priority for sorting (higher number = higher priority)
 */
export const getAlertPriority = (severity: WeatherAlert["severity"]): number => {
  switch (severity) {
    case "extreme":
      return 4;
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
    default:
      return 0;
  }
};

/**
 * Sort alerts by priority (most severe first)
 */
export const sortAlertsByPriority = (alerts: WeatherAlert[]): WeatherAlert[] => {
  return alerts.sort((a, b) => getAlertPriority(b.severity) - getAlertPriority(a.severity));
};

/**
 * Get alert severity color classes for UI
 */
export const getAlertSeverityStyles = (severity: WeatherAlert["severity"]) => {
  switch (severity) {
    case "extreme":
      return {
        bg: "bg-red-500/20",
        border: "border-red-500/30",
        text: "text-red-100",
        accent: "text-red-300",
      };
    case "high":
      return {
        bg: "bg-orange-500/20",
        border: "border-orange-500/30",
        text: "text-orange-100",
        accent: "text-orange-300",
      };
    case "medium":
      return {
        bg: "bg-yellow-500/20",
        border: "border-yellow-500/30",
        text: "text-yellow-100",
        accent: "text-yellow-300",
      };
    case "low":
      return {
        bg: "bg-blue-500/20",
        border: "border-blue-500/30",
        text: "text-blue-100",
        accent: "text-blue-300",
      };
    default:
      return {
        bg: "bg-gray-500/20",
        border: "border-gray-500/30",
        text: "text-gray-100",
        accent: "text-gray-300",
      };
  }
};

/**
 * Check if alerts should show notification
 */
export const shouldShowNotification = (alert: WeatherAlert): boolean => {
  return alert.severity === "extreme" || alert.severity === "high";
};
