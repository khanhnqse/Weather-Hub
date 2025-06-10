"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WeatherData } from "@/types/weather";
import {
  WeatherAlert,
  generateWeatherAlerts,
  sortAlertsByPriority,
  getAlertSeverityStyles,
  shouldShowNotification,
} from "@/utils/weatherAlerts";

interface WeatherAlertsProps {
  weather: WeatherData;
  className?: string;
}

export const WeatherAlerts = ({ weather, className = "" }: WeatherAlertsProps) => {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  // Generate alerts when weather data changes
  useEffect(() => {
    if (weather) {
      const newAlerts = generateWeatherAlerts(weather);
      const sortedAlerts = sortAlertsByPriority(newAlerts);
      setAlerts(sortedAlerts);

      // Show browser notification for severe alerts
      if ('Notification' in window && Notification.permission === 'granted') {
        const severeAlerts = sortedAlerts.filter(alert => 
          shouldShowNotification(alert) && !dismissedAlerts.has(alert.id)
        );
        
        severeAlerts.forEach(alert => {
          new Notification(`WeatherHub - ${alert.title}`, {
            body: alert.message,
            icon: '/favicon.svg',
            tag: alert.id,
          });
        });
      }
    }
  }, [weather, dismissedAlerts]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.has(alert.id));
  const displayedAlerts = showAll ? visibleAlerts : visibleAlerts.slice(0, 2);

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Alert Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <h3 className="text-white/90 font-semibold text-sm">
            Cảnh báo thời tiết ({visibleAlerts.length})
          </h3>
        </div>
        
        {visibleAlerts.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-300 hover:text-blue-200 text-xs font-medium transition-colors"
          >
            {showAll ? "Thu gọn" : `Xem thêm (${visibleAlerts.length - 2})`}
          </button>
        )}
      </div>

      {/* Alerts List */}
      <AnimatePresence mode="popLayout">
        {displayedAlerts.map((alert, index) => {
          const styles = getAlertSeverityStyles(alert.severity);
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className={`
                ${styles.bg} ${styles.border} backdrop-blur-lg rounded-2xl border p-4
                hover:scale-[1.02] transition-all duration-200 group relative overflow-hidden
              `}
            >
              {/* Alert Content */}
              <div className="flex items-start gap-3 relative z-10">
                {/* Icon */}
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/10">
                  <span className="text-lg">{alert.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`font-semibold text-sm ${styles.accent} leading-tight`}>
                      {alert.title}
                    </h4>
                    
                    {/* Dismiss Button */}
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors group/btn"
                    >
                      <svg 
                        className="w-3 h-3 text-white/60 group-hover/btn:text-white/80" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M6 18L18 6M6 6l12 12" 
                        />
                      </svg>
                    </button>
                  </div>

                  <p className={`${styles.text} text-xs leading-relaxed`}>
                    {alert.message}
                  </p>

                  {/* Severity Badge */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium capitalize
                      ${alert.severity === 'extreme' ? 'bg-red-500/30 text-red-200' :
                        alert.severity === 'high' ? 'bg-orange-500/30 text-orange-200' :
                        alert.severity === 'medium' ? 'bg-yellow-500/30 text-yellow-200' :
                        'bg-blue-500/30 text-blue-200'
                      }
                    `}>
                      {alert.severity === 'extreme' ? 'Nguy hiểm' :
                       alert.severity === 'high' ? 'Cao' :
                       alert.severity === 'medium' ? 'Trung bình' : 'Thấp'}
                    </span>
                    
                    <span className="text-white/40 text-xs">
                      {new Date(alert.timestamp).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Animated Background Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                className={`absolute inset-0 ${styles.accent.replace('text-', 'bg-')} rounded-2xl`}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Summary when collapsed */}
      {!showAll && visibleAlerts.length > 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-2"
        >
          <span className="text-white/60 text-xs">
            và {visibleAlerts.length - 2} cảnh báo khác...
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default WeatherAlerts;
