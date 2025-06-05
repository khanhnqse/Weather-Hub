import React from "react";
import { RecentSearches } from "./RecentSearches";

interface SearchFormProps {
  city: string;
  setCity: (city: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  recentSearches?: string[];
  onSearchSelect?: (city: string) => void;
  onClearRecentSearches?: () => void;
}

export const SearchForm = ({
  city,
  setCity,
  onSubmit,
  loading,
  recentSearches = [],
  onSearchSelect,
  onClearRecentSearches,
}: SearchFormProps) => {
  return (
    <div className="mb-8">
      <form onSubmit={onSubmit}>
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

      {/* Recent Searches */}
      {recentSearches.length > 0 && onSearchSelect && onClearRecentSearches && (
        <RecentSearches
          searches={recentSearches}
          onSearchSelect={onSearchSelect}
          onClear={onClearRecentSearches}
          className="mt-4"
        />
      )}
    </div>
  );
};
