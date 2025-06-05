import { useState, useEffect } from 'react';

const RECENT_SEARCHES_KEY = 'weather-app-recent-searches';
const MAX_RECENT_SEARCHES = 5;

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const searches = JSON.parse(stored);
        if (Array.isArray(searches)) {
          setRecentSearches(searches);
        }
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  }, []);

  // Add a new search to the recent searches
  const addRecentSearch = (cityName: string) => {
    if (!cityName.trim()) return;

    const trimmedCity = cityName.trim();
    
    setRecentSearches(prevSearches => {
      // Remove if already exists to avoid duplicates
      const filtered = prevSearches.filter(
        search => search.toLowerCase() !== trimmedCity.toLowerCase()
      );
      
      // Add to the beginning of the list
      const newSearches = [trimmedCity, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      
      // Save to localStorage
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
      } catch (error) {
        console.error('Error saving recent searches:', error);
      }
      
      return newSearches;
    });
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (error) {
      console.error('Error clearing recent searches:', error);
    }
  };

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches
  };
};
