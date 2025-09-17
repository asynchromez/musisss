'use client';

import { Playlist } from '@/types/music';
import { Play, Pause } from 'lucide-react';
import Image from 'next/image';

interface PlaylistHeaderProps {
  playlist: Playlist;
  isPlaying: boolean;
  onPlayAll: () => void;
}

export const PlaylistHeader = ({ playlist, isPlaying, onPlayAll }: PlaylistHeaderProps) => {
  return (
    <div className="bg-gray-50 p-8 mb-8 rounded-2xl border border-gray-200">
      <div className="flex items-end gap-6">
        {/* Playlist Cover */}
        <div className="w-48 h-48 relative rounded-2xl overflow-hidden shadow-lg bg-gray-200 flex-shrink-0">
          <Image
            src={playlist.imageSrc}
            alt={playlist.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Playlist Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Playlist
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {playlist.name}
          </h1>
          <p className="text-lg text-gray-600 font-light mb-6 leading-relaxed">
            {playlist.description}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={onPlayAll}
              className="bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-0.5" />
              )}
            </button>
            <span className="text-gray-500 text-sm font-light">
              {playlist.trackIds.length} tracks
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};