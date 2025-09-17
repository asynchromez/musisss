import { Track, Playlist } from '@/types/music';

export const tracks: Track[] = [
  // Electronic Playlist
  {
    id: 1,
    title: "Alibi Opium",
    artist: "ALIBI OPIUM",
    audioSrc: "/music/1.wav",
    imageSrc: "/covers/1.jpg",
    playlistId: 1
  },
  {
    id: 2,
    title: "Take Me Away",
    artist: "Take Me Away",
    audioSrc: "/music/2.wav", 
    imageSrc: "/covers/2.jpg",
    playlistId: 1
  },
  {
    id: 3,
    title: "sky(slowed)",
    artist: "bluent, bre.beats, nowayback collective",
    audioSrc: "/music/5.wav",
    imageSrc: "/covers/5.jpg",
    playlistId: 1
  },
  
  // Ambient Playlist
  {
    id: 4,
    title: "still breathing",
    artist: "kennycarter & yung dexn",
    audioSrc: "/music/7.wav",
    imageSrc: "/covers/7.jpg",
    playlistId: 2
  },
  {
    id: 5,
    title: "JUST DANCE (Slowed)",
    artist: "teefaygoo, EVO",
    audioSrc: "/music/8.wav",
    imageSrc: "/covers/8.jpg",
    playlistId: 2
  },
  {
    id: 6,
    title: "Oshi no Ko - (nightcore)",
    artist: "MUPP",
    audioSrc: "/music/9.wav",
    imageSrc: "/covers/9.jpg",
    playlistId: 2
  },
  {
    id: 7,
    title: "RITMO CASINHA",
    artist: "NAKAMA",
    audioSrc: "/music/10.wav",
    imageSrc: "/covers/10.jpg",
    playlistId: 2
  },

  // Trap Playlist
  {
    id: 8,
    title: "still breathing",
    artist: "kennycarter & yung dexn",
    audioSrc: "/music/7.wav",
    imageSrc: "/covers/7.jpg",
    playlistId: 3
  },
  {
    id: 9,
    title: "RITMO CASINHA",
    artist: "NAKAMA",
    audioSrc: "/music/10.wav",
    imageSrc: "/covers/10.jpg",
    playlistId: 3
  },
  {
    id: 10,
    title: "JUST DANCE (Slowed)",
    artist: "teefaygoo, EVO",
    audioSrc: "/music/8.wav",
    imageSrc: "/covers/8.jpg",
    playlistId: 3
  },
  {
    id: 11,
    title: "Oshi no Ko - (nightcore)",
    artist: "MUPP",
    audioSrc: "/music/9.wav",
    imageSrc: "/covers/9.jpg",
    playlistId: 3
  },
  {
    id: 13,
    title: "LOUCURA LETAL",
    artist: "NAKAMA, Nxxkz",
    audioSrc: "/music/11.wav",
    imageSrc: "/covers/11.jpg",
    playlistId: 3
  },

  // Angelcore Playlist
  {
    id: 14,
    title: "gravelight",
    artist: "angeltears",
    audioSrc: "/music/12.wav",
    imageSrc: "/covers/12.jpg",
    playlistId: 4
  },
  {
    id: 15,
    title: "amnesis",
    artist: "angeltears",
    audioSrc: "/music/13.wav",
    imageSrc: "/covers/13.jpg",
    playlistId: 4
  },
  {
    id: 16,
    title: "voiceless",
    artist: "angeltears",
    audioSrc: "/music/14.wav",
    imageSrc: "/covers/14.jpg",
    playlistId: 4
  },
  {
    id: 17,
    title: "still see you",
    artist: "angeltears",
    audioSrc: "/music/15.wav",
    imageSrc: "/covers/15.jpg",
    playlistId: 4
  }
];

export const playlists: Playlist[] = [
  {
    id: 1,
    name: "Мейн",
    description: "Мейн плейлист",
    imageSrc: "https://i.pinimg.com/1200x/8f/84/56/8f8456c22b185ced7aaa02139e09d821.jpg",
    trackIds: [1, 2, 3]
  },
  {
    id: 2,
    name: "Luv",
    description: "Ничего.",
    imageSrc: "https://i.pinimg.com/736x/00/c7/0a/00c70a52ffb398511a9d286eec97fc56.jpg",
    trackIds: [4, 5, 6, 7]
  },
  {
    id: 3,
    name: "Trap",
    description: "Тут будет трэп",
    imageSrc: "https://i.pinimg.com/736x/66/6c/c3/666cc3d633ce8fc6f2c33a969f0746b4.jpg",
    trackIds: [8, 9, 10, 11, 12]
  },
  {
    id: 4,
    name: "Angelcore",
    description: "Ангел core",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8omkLlYEztC1k3dvrcv1GZK5YLPuSEFamYQ&s",
    trackIds: [14, 15, 16, 16]
  }
];