import { useState, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'musisss-favorites';

export const useFavorites = () => {
  const [favoriteTrackIds, setFavoriteTrackIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every(id => typeof id === 'number')) {
          setFavoriteTrackIds(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteTrackIds));
      } catch (error) {
        console.error('Failed to save favorites to localStorage:', error);
      }
    }
  }, [favoriteTrackIds, isLoaded]);

  const toggleFavorite = (trackId: number) => {
    setFavoriteTrackIds(prev => {
      if (prev.includes(trackId)) {
        return prev.filter(id => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
  };

  const isFavorite = (trackId: number) => {
    return favoriteTrackIds.includes(trackId);
  };

  return {
    favoriteTrackIds,
    toggleFavorite,
    isFavorite,
  };
};