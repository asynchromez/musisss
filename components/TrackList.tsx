'use client';

import { Track } from '@/types/music';
import { useTrackDurations } from '@/hooks/useTrackDurations';
import { useFavorites } from '@/hooks/useFavorites';
import { Play, Pause, Heart } from 'lucide-react';
import Image from 'next/image';

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onTogglePlay: () => void;
}

export const TrackList = ({ 
  tracks, 
  currentTrack, 
  isPlaying, 
  onTrackSelect,
  onTogglePlay 
}: TrackListProps) => {
  const { trackDurations, loadingDurations, formatTime } = useTrackDurations(tracks);
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-200">
      <div className="p-8">
        <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-wide">Your Playlist</h2>
        <div className="space-y-1">
          {tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            const duration = trackDurations[track.id];
            const isLoadingDuration = loadingDurations[track.id];
            const trackIsFavorite = isFavorite(track.id);
            
            return (
              <div
                key={track.id}
                className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-100 ${
                  isCurrentTrack ? 'bg-blue-50' : ''
                }`}
                onClick={() => {
                  if (isCurrentTrack) {
                    onTogglePlay();
                  } else {
                    onTrackSelect(track);
                  }
                }}
              >
                {/* Track Number / Play Button */}
                <div className="w-10 h-10 flex items-center justify-center relative">
                  <span className={`text-sm text-gray-500 font-light transition-opacity duration-200 ${
                    isCurrentTrack || 'group-hover:opacity-0'
                  } ${isCurrentTrack ? 'opacity-0' : ''}`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  
                  {/* Current track controls */}
                  {isCurrentTrack && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-gray-900" />
                      ) : (
                        <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                      )}
                    </div>
                  )}
                  
                  {/* Hover play button for non-current tracks */}
                  {!isCurrentTrack && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                    </div>
                  )}
                </div>

                {/* Album Cover */}
                <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={track.imageSrc}
                    alt={track.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2';
                    }}
                  />
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium text-base truncate transition-colors duration-200 ${
                    isCurrentTrack ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'
                  }`}>
                    {track.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate mt-0.5">{track.artist}</p>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(track.id);
                  }}
                  className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                    trackIsFavorite 
                      ? 'text-red-500 hover:text-red-400' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label={trackIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart 
                    className={`w-5 h-5 transition-all duration-200 ${
                      trackIsFavorite ? 'fill-current' : ''
                    }`} 
                  />
                </button>

                {/* Duration */}
                <div className="text-sm text-gray-500 font-light">
                  {isLoadingDuration ? (
                    <div className="w-4 h-4 border border-gray-300 border-t-gray-500 rounded-full animate-spin mx-auto" />
                  ) : duration ? (
                    formatTime(duration)
                  ) : (
                    '--:--'
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};