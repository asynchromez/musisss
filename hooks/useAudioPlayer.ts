'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Track, PlayerState } from '@/types/music';

export const useAudioPlayer = (tracks: Track[]) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isLoading: false,
  });

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);

  const playTrack = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    const trackIndex = tracks.findIndex(t => t.id === track.id);
    setCurrentTrackIndex(trackIndex);
    setPlayerState(prev => ({ 
      ...prev, 
      currentTrack: track,
      isLoading: true 
    }));

    audio.src = track.audioSrc;
    audio.load();
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlayerState(prev => ({ 
            ...prev, 
            isPlaying: true,
            isLoading: false 
          }));
        })
        .catch(() => {
          setPlayerState(prev => ({ 
            ...prev, 
            isPlaying: false,
            isLoading: false 
          }));
        });
    }
  }, [tracks]);

  const playNext = useCallback(() => {
    if (tracks.length === 0) return;
    
    if (currentTrackIndex < tracks.length - 1) {
      const nextTrack = tracks[currentTrackIndex + 1];
      playTrack(nextTrack);
    } else {
      // Если это последний трек, начинаем сначала
      const firstTrack = tracks[0];
      playTrack(firstTrack);
    }
  }, [currentTrackIndex, tracks, playTrack]);

  const playPrevious = useCallback(() => {
    if (tracks.length === 0) return;
    
    if (currentTrackIndex > 0) {
      const prevTrack = tracks[currentTrackIndex - 1];
      playTrack(prevTrack);
    } else {
      // Если это первый трек, переходим к последнему
      const lastTrack = tracks[tracks.length - 1];
      playTrack(lastTrack);
    }
  }, [currentTrackIndex, tracks, playTrack]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playerState.isPlaying) {
      audio.pause();
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayerState(prev => ({ ...prev, isPlaying: true }));
          })
          .catch(() => {
            setPlayerState(prev => ({ ...prev, isPlaying: false }));
          });
      }
    }
  }, [playerState.isPlaying]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = time;
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const clampedVolume = Math.max(0, Math.min(1, volume));
    audio.volume = clampedVolume;
    setPlayerState(prev => ({ ...prev, volume: clampedVolume }));
  }, []);

  // Теперь useEffect идет после всех функций
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }));
    };

    const handleLoadStart = () => {
      setPlayerState(prev => ({ ...prev, isLoading: true }));
    };

    const handleLoadedData = () => {
      setPlayerState(prev => ({ 
        ...prev, 
        isLoading: false,
        duration: audio.duration || 0 
      }));
    };

    const handleEnded = () => {
      playNext();
    };

    const handleError = () => {
      setPlayerState(prev => ({ ...prev, isLoading: false }));
      console.error('Audio loading error');
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [playNext]); // Теперь playNext уже объявлен

  return {
    audioRef,
    playerState,
    playTrack,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    setVolume,
    currentTrackIndex,
  };
};