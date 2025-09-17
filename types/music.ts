export interface Track {
  id: number;
  title: string;
  artist: string;
  audioSrc: string;
  imageSrc: string;
  duration?: number;
  playlistId: number;
}

export interface Playlist {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
  trackIds: number[];
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
}

export interface TrackWithDuration extends Track {
  duration: number;
  isLoadingDuration?: boolean;
}

export interface FavoritesState {
  favoriteTrackIds: number[];
  toggleFavorite: (trackId: number) => void;
  isFavorite: (trackId: number) => boolean;
}