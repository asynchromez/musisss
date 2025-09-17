'use client';

import { useState } from 'react';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useFavorites } from '@/hooks/useFavorites';
import { PlayerControls } from '@/components/PlayerControls';
import { MobilePlayer } from '@/components/MobilePlayer';
import { TrackList } from '@/components/TrackList';
import { Sidebar } from '@/components/Sidebar';
import { PlaylistHeader } from '@/components/PlaylistHeader';
import { NowPlaying } from '@/components/NowPlaying';
import { tracks, playlists } from '@/data/tracks';

export default function Home() {
  const [activePlaylistId, setActivePlaylistId] = useState(1);
  
  // Get current playlist and its tracks
  const currentPlaylist = playlists.find(p => p.id === activePlaylistId)!;
  const playlistTracks = tracks.filter(track => track.playlistId === activePlaylistId);

  const {
    audioRef,
    playerState,
    playTrack,
    togglePlayPause,
    playNext,
    playPrevious,
    seek,
    setVolume,
  } = useAudioPlayer(playlistTracks);

  // Initialize favorites hook to ensure localStorage is set up
  useFavorites();

  const handlePlayAll = () => {
    if (playlistTracks.length > 0) {
      if (playerState.currentTrack && playlistTracks.some(t => t.id === playerState.currentTrack?.id)) {
        togglePlayPause();
      } else {
        playTrack(playlistTracks[0]);
      }
    }
  };

  const isPlaylistPlaying = playerState.currentTrack && 
    playlistTracks.some(track => track.id === playerState.currentTrack?.id) && 
    playerState.isPlaying;

  return (
    <div className="min-h-screen bg-white text-black-900 flex flex-col">
      {/* Hidden audio element */}
      <audio ref={audioRef} />
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full flex-1">
        {/* Sidebar */}
        <Sidebar
          playlists={playlists}
          activePlaylistId={activePlaylistId}
          onPlaylistSelect={setActivePlaylistId}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="max-w-6xl mx-auto">
              {/* Playlist Header */}
              <PlaylistHeader
                playlist={currentPlaylist}
                isPlaying={!!isPlaylistPlaying}
                onPlayAll={handlePlayAll}
              />

              {/* Track List */}
              <div className="mt-6">
                <TrackList
                  tracks={playlistTracks}
                  currentTrack={playerState.currentTrack}
                  isPlaying={playerState.isPlaying}
                  onTrackSelect={playTrack}
                  onTogglePlay={togglePlayPause}
                />
              </div>
            </div>
          </div>

          {/* Desktop Player Controls - Fixed positioning */}
          <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white z-10">
            <PlayerControls
              playerState={playerState}
              onTogglePlay={togglePlayPause}
              onNext={playNext}
              onPrevious={playPrevious}
              onSeek={seek}
              onVolumeChange={setVolume}
            />
          </div>
        </div>

        {/* Now Playing Sidebar */}
        <NowPlaying currentTrack={playerState.currentTrack} />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden w-full flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Mobile Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Musisss
            </h1>
            <p className="text-sm text-gray-600">
              {currentPlaylist.name}
            </p>
          </div>

          {/* Mobile Playlist Selector */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => setActivePlaylistId(playlist.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                    activePlaylistId === playlist.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {playlist.name}
                </button>
              ))}
            </div>
          </div>

          {/* Track List */}
          <TrackList
            tracks={playlistTracks}
            currentTrack={playerState.currentTrack}
            isPlaying={playerState.isPlaying}
            onTrackSelect={playTrack}
            onTogglePlay={togglePlayPause}
          />
        </div>

        {/* Mobile Player */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-white">
          <MobilePlayer
            playerState={playerState}
            onTogglePlay={togglePlayPause}
            onNext={playNext}
            onPrevious={playPrevious}
            onSeek={seek}
            onVolumeChange={setVolume}
          />
        </div>
      </div>
    </div>
  );
}