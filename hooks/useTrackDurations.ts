import { useState, useEffect } from 'react';
import { Track } from '@/types/music';

export const useTrackDurations = (tracks: Track[]) => {
  const [trackDurations, setTrackDurations] = useState<{ [key: number]: number }>({});
  const [loadingDurations, setLoadingDurations] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const loadDurations = async () => {
      for (const track of tracks) {
        if (trackDurations[track.id]) continue;

        setLoadingDurations(prev => ({ ...prev, [track.id]: true }));

        try {
          const audio = new Audio();
          
          const loadPromise = new Promise<number>((resolve, reject) => {
            const handleLoadedMetadata = () => {
              resolve(audio.duration);
              cleanup();
            };

            const handleError = () => {
              reject(new Error('Failed to load audio'));
              cleanup();
            };

            const cleanup = () => {
              audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
              audio.removeEventListener('error', handleError);
              audio.src = '';
            };

            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('error', handleError);
          });

          audio.src = track.audioSrc;
          audio.load();

          const duration = await loadPromise;
          
          setTrackDurations(prev => ({ ...prev, [track.id]: duration }));
        } catch (error) {
          console.error(`Failed to load duration for track ${track.id}:`, error);
          // Set a default duration if loading fails
          setTrackDurations(prev => ({ ...prev, [track.id]: 180 })); // 3:00 default
        } finally {
          setLoadingDurations(prev => ({ ...prev, [track.id]: false }));
        }
      }
    };

    loadDurations();
  }, [tracks, trackDurations]);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    trackDurations,
    loadingDurations,
    formatTime,
  };
};