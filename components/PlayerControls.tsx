'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlayerState } from '@/types/music';
import Image from 'next/image';

interface PlayerControlsProps {
  playerState: PlayerState;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

export const PlayerControls = ({
  playerState,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
}: PlayerControlsProps) => {
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgressInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * playerState.duration;
    onSeek(newTime);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingProgress(true);
    handleProgressInteraction(e);
  };

  const handleProgressMouseMove = (e: MouseEvent) => {
    if (!isDraggingProgress) return;
    const rect = progressRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * playerState.duration;
    onSeek(newTime);
  };

  const handleProgressMouseUp = () => {
    setIsDraggingProgress(false);
  };

  const handleVolumeInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = volumeRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    onVolumeChange(percentage);
  };

  const handleVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingVolume(true);
    handleVolumeInteraction(e);
  };

  const handleVolumeMouseMove = (e: MouseEvent) => {
    if (!isDraggingVolume) return;
    const rect = volumeRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    onVolumeChange(percentage);
  };

  const handleVolumeMouseUp = () => {
    setIsDraggingVolume(false);
  };

  const progressPercentage = playerState.duration 
    ? (playerState.currentTime / playerState.duration) * 100 
    : 0;

  // Mouse event listeners for dragging
  useEffect(() => {
    if (isDraggingProgress) {
      document.addEventListener('mousemove', handleProgressMouseMove);
      document.addEventListener('mouseup', handleProgressMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleProgressMouseMove);
        document.removeEventListener('mouseup', handleProgressMouseUp);
      };
    }
  }, [isDraggingProgress]);

  useEffect(() => {
    if (isDraggingVolume) {
      document.addEventListener('mousemove', handleVolumeMouseMove);
      document.addEventListener('mouseup', handleVolumeMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleVolumeMouseMove);
        document.removeEventListener('mouseup', handleVolumeMouseUp);
      };
    }
  }, [isDraggingVolume]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target !== document.body) return;
      
      if (e.code === 'Space') {
        e.preventDefault();
        onTogglePlay();
      }
      if (e.code === 'ArrowRight' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onNext();
      }
      if (e.code === 'ArrowLeft' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onPrevious();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onTogglePlay, onNext, onPrevious]);

  if (!playerState.currentTrack) {
    return (
      <div className="bg-black border-t border-gray-800 p-6">
        <div className="text-center text-gray-400">
          <p className="font-light">Select a track to start playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto gap-6">
        {/* Current Track Info - Left aligned with minimal padding */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
            <Image
              src={playerState.currentTrack.imageSrc}
              alt={playerState.currentTrack.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2';
              }}
            />
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-white text-sm truncate">
              {playerState.currentTrack.title}
            </h3>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {playerState.currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Main Controls - Center */}
        <div className="flex flex-col items-center gap-3 flex-1 max-w-md">
          {/* Control Buttons */}
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-full"
              onClick={onPrevious}
              aria-label="Previous track"
            >
              <SkipBack className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="bg-white text-black hover:bg-gray-200 w-10 h-10 rounded-full p-2"
              onClick={onTogglePlay}
              disabled={playerState.isLoading}
              aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
            >
              {playerState.isLoading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : playerState.isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-full"
              onClick={onNext}
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress Bar - 1.5 times wider */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs text-gray-500 w-10 text-right font-medium">
              {formatTime(playerState.currentTime)}
            </span>
            <div
              ref={progressRef}
              className="flex-1 h-1.5 bg-gray-700 rounded-full cursor-pointer group relative overflow-hidden select-none"
              onClick={handleProgressInteraction}
              onMouseDown={handleProgressMouseDown}
              onTouchStart={handleProgressInteraction}
              role="slider"
              aria-label="Seek"
              tabIndex={0}
            >
              <div 
                className={`h-full bg-white rounded-full ${
                  isDraggingProgress ? '' : 'transition-all duration-150'
                }`}
                style={{ width: `${progressPercentage}%` }}
              >
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-all ${
                  isDraggingProgress ? 'opacity-100 scale-125' : 'opacity-0'
                }`} />
              </div>
            </div>
            <span className="text-xs text-gray-500 w-10 font-medium">
              {formatTime(playerState.duration)}
            </span>
          </div>
        </div>

        {/* Volume Control - Right aligned with minimal padding */}
        <div className="flex items-center gap-2 justify-end flex-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-full"
            onClick={() => onVolumeChange(playerState.volume > 0 ? 0 : 1)}
            aria-label={playerState.volume > 0 ? 'Mute' : 'Unmute'}
          >
            {playerState.volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          <div
            ref={volumeRef}
            className="w-20 h-1 bg-gray-700 rounded-full cursor-pointer group relative overflow-hidden select-none"
            onClick={handleVolumeInteraction}
            onMouseDown={handleVolumeMouseDown}
            onTouchStart={handleVolumeInteraction}
            role="slider"
            aria-label="Volume"
            tabIndex={0}
          >
            <div 
              className={`h-full bg-white rounded-full ${
                isDraggingVolume ? '' : 'transition-all duration-150'
              }`}
              style={{ width: `${playerState.volume * 100}%` }}
            >
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-all ${
                isDraggingVolume ? 'opacity-100 scale-125' : 'opacity-0'
              }`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};