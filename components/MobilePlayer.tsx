'use client';

import { useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  ChevronUp,
  MoreHorizontal,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlayerState } from '@/types/music';
import Image from 'next/image';

interface MobilePlayerProps {
  playerState: PlayerState;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

export const MobilePlayer = ({
  playerState,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
}: MobilePlayerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
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

  const handleProgressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDraggingProgress(true);
    handleProgressInteraction(e);
  };

  const handleProgressTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingProgress) return;
    e.preventDefault();
    handleProgressInteraction(e);
  };

  const handleProgressTouchEnd = () => {
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

  const handleVolumeTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDraggingVolume(true);
    handleVolumeInteraction(e);
  };

  const handleVolumeTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingVolume) return;
    e.preventDefault();
    handleVolumeInteraction(e);
  };

  const handleVolumeTouchEnd = () => {
    setIsDraggingVolume(false);
  };

  const progressPercentage = playerState.duration 
    ? (playerState.currentTime / playerState.duration) * 100 
    : 0;

  if (!playerState.currentTrack) {
    return null;
  }

  return (
    <>
      {/* Compact Bottom Player */}
      <div 
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 z-50 transition-all duration-300 shadow-2xl ${
          isExpanded ? 'translate-y-full' : 'translate-y-0'
        }`}
        style={{ 
          paddingBottom: 'env(safe-area-inset-bottom, 0)',
          marginBottom: 'calc(env(safe-area-inset-bottom, 0) + 0px)'
        }}
      >
        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className="h-1 bg-white/20 relative cursor-pointer select-none"
          onClick={handleProgressInteraction}
          onTouchStart={handleProgressTouchStart}
          onTouchMove={handleProgressTouchMove}
          onTouchEnd={handleProgressTouchEnd}
        >
          <div 
            className={`h-full bg-white ${
              isDraggingProgress ? '' : 'transition-all duration-150'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            {/* Album Cover - Smaller */}
            <div className="w-10 h-10 relative rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
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

            {/* Track Info - Minimal */}
            <div 
              className="flex-1 min-w-0 cursor-pointer px-2"
              onClick={() => setIsExpanded(true)}
            >
              <h3 className="font-medium text-white text-xs truncate">
                {playerState.currentTrack.title}
              </h3>
              <p className="text-[11px] text-white/60 truncate">
                {playerState.currentTrack.artist}
              </p>
            </div>

            {/* Controls - All buttons visible */}
            <div className="flex items-center gap-0.5">
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-white p-1.5 hover:bg-white/10 rounded-full transition-all duration-200 min-w-[32px] h-8"
                onClick={onPrevious}
              >
                <SkipBack className="w-3.5 h-3.5" />
              </Button>
              
              {/* Play/Pause Button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-white p-1.5 hover:bg-white/10 rounded-full transition-all duration-200 min-w-[32px] h-8"
                onClick={onTogglePlay}
                disabled={playerState.isLoading}
              >
                {playerState.isLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : playerState.isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                )}
              </Button>
              
              {/* Next Button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-white p-1.5 hover:bg-white/10 rounded-full transition-all duration-200 min-w-[32px] h-8"
                onClick={onNext}
              >
                <SkipForward className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Full Screen Player */}
      <div 
        className={`lg:hidden fixed inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 z-50 transition-all duration-300 ${
          isExpanded ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          paddingBottom: 'env(safe-area-inset-bottom, 0)'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 pt-12">
            <Button
              variant="ghost"
              size="sm"
              className="text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200"
              onClick={() => setIsExpanded(false)}
            >
              <ChevronUp className="w-6 h-6" />
            </Button>
            <h2 className="text-sm font-medium text-white/90">Now Playing</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200"
            >
              <MoreHorizontal className="w-6 h-6" />
            </Button>
          </div>

          {/* Album Art */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-64 h-64 max-w-[75vw] max-h-[75vw] relative rounded-2xl overflow-hidden shadow-xl bg-white/5">
              <Image
                src={playerState.currentTrack.imageSrc}
                alt={playerState.currentTrack.title}
                fill
                className="object-cover transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2';
                }}
              />
            </div>
          </div>

          {/* Track Info and Controls */}
          <div className="p-6 space-y-8">
            {/* Track Info */}
            <div className="text-center">
              <h1 className="text-xl font-bold text-white mb-2">
                {playerState.currentTrack.title}
              </h1>
              <p className="text-lg text-white/70">
                {playerState.currentTrack.artist}
              </p>
            </div>

            {/* Progress */}
            <div className="space-y-3">
              <div 
                ref={progressRef}
                className="h-1.5 bg-white/20 rounded-full relative cursor-pointer select-none"
                onClick={handleProgressInteraction}
                onTouchStart={handleProgressTouchStart}
                onTouchMove={handleProgressTouchMove}
                onTouchEnd={handleProgressTouchEnd}
              >
                <div 
                  className={`h-full bg-white rounded-full relative ${
                    isDraggingProgress ? '' : 'transition-all duration-150'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-200 ${
                    isDraggingProgress ? 'opacity-100 scale-110' : 'opacity-90 scale-100'
                  }`} />
                </div>
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>{formatTime(playerState.currentTime)}</span>
                <span>{formatTime(playerState.duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8">
              <Button
                variant="ghost"
                size="sm"
                className="text-white p-3 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-105"
                onClick={onPrevious}
              >
                <SkipBack className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="bg-white text-black hover:bg-white/90 w-16 h-16 rounded-full p-4 shadow-xl transition-all duration-200 hover:scale-105"
                onClick={onTogglePlay}
                disabled={playerState.isLoading}
              >
                {playerState.isLoading ? (
                  <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : playerState.isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-0.5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white p-3 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-105"
                onClick={onNext}
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};