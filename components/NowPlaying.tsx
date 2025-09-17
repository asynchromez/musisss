'use client';

import { Track } from '@/types/music';
import Image from 'next/image';

interface NowPlayingProps {
  currentTrack: Track | null;
}

export const NowPlaying = ({ currentTrack }: NowPlayingProps) => {
  if (!currentTrack) {
    return (
      <div className="w-80 bg-black/40 backdrop-blur-sm border-l border-white/10 p-6">
        <div className="text-center text-white/40">
          <div className="w-64 h-64 bg-white/5 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <div className="text-white/20">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          </div>
          <p className="font-light">No track selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 bg-black/50 backdrop-blur-md border-l border-white/10 p-8">
      <h2 className="text-base font-semibold text-white/70 uppercase tracking-wider mb-8">
        Now Playing
      </h2>
      
      {/* Album Art */}
      <div className="w-80 h-80 relative rounded-3xl overflow-hidden shadow-2xl bg-white/5 mx-auto mb-8 ring-1 ring-white/10">
        <Image
          src={currentTrack.imageSrc}
          alt={currentTrack.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2';
          }}
        />
      </div>

      {/* Track Info */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-3 leading-tight hover:text-blue-300 transition-colors cursor-pointer">
          {currentTrack.title}
        </h3>
        <p className="text-lg text-white/70 font-medium hover:text-white/90 transition-colors cursor-pointer">
          {currentTrack.artist}
        </p>
      </div>
    </div>
  );
};