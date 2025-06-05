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
  onLocationRequest?: () => void;
  locationDenied?: boolean;
}

export const SearchForm = ({
  city,
  setCity,
  onSubmit,
  loading,
  recentSearches = [],
  onSearchSelect,
  onClearRecentSearches,
  onLocationRequest,
  locationDenied = false,
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
        </div>{" "}
      </form>

      {/* Location button - show if location feature is available and not denied */}
      {onLocationRequest && !locationDenied && "geolocation" in navigator && (
        <div className="mt-4 text-center">
          <button
            onClick={onLocationRequest}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-full transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
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
            Sử dụng vị trí hiện tại
          </button>
        </div>
      )}

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
