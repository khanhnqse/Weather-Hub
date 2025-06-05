import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RecentSearchesProps {
  searches: string[];
  onSearchSelect: (city: string) => void;
  onClear: () => void;
  className?: string;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  searches,
  onSearchSelect,
  onClear,
  className = ""
}) => {
  if (searches.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white/80 text-sm font-medium">Tìm kiếm gần đây</h3>
        <button
          onClick={onClear}
          className="text-white/60 hover:text-white/80 text-xs transition-colors duration-200"
        >
          Xóa tất cả
        </button>
      </div>
      
      <div className="space-y-2">
        <AnimatePresence>
          {searches.map((city, index) => (
            <motion.button
              key={city}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSearchSelect(city)}
              className="w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all duration-200 flex items-center gap-2 group"
            >
              <svg
                className="w-4 h-4 text-white/60 group-hover:text-white/80 transition-colors"
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
              <span className="text-sm">{city}</span>
              <svg
                className="w-3 h-3 ml-auto text-white/40 group-hover:text-white/60 transition-colors opacity-0 group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
