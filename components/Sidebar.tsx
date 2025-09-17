'use client';

import { Playlist } from '@/types/music';
import { Music } from 'lucide-react';
import Image from 'next/image';

interface SidebarProps {
  playlists: Playlist[];
  activePlaylistId: number;
  onPlaylistSelect: (playlistId: number) => void;
}

export const Sidebar = ({ playlists, activePlaylistId, onPlaylistSelect }: SidebarProps) => {
  return (
    <div className="w-80 bg-black/40 backdrop-blur-sm border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-light text-white tracking-wide">
            Musisss
          </h1>
        </div>
      </div>

      {/* Playlists */}
      <div className="flex-1 p-6">
        <h2 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
          Playlists
        </h2>
        <div className="space-y-2">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onPlaylistSelect(playlist.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left ${
                activePlaylistId === playlist.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                <Image
                  src={playlist.imageSrc}
                  alt={playlist.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm truncate">
                  {playlist.name}
                </h3>
                <p className="text-xs text-white/50 truncate mt-0.5">
                  {playlist.trackIds.length} tracks
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};