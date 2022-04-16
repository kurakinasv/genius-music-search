export type SongType = {
  id: number;
  title: string;
  artist: string;
  artist_names?: string;

  annotationCount?: number | null;
  header_image_url?: string;
  // song_art_image_url?: string;
  songImg?: string;
  stats?: SongStatsType;
  artistInfo?: ArtistType;
};

export type SongPageType = {
  id: number;
  title: string;
  annotationCount?: number | null;
  apple_music_player_url?: string;
  artist: string;
  description?: any;
  date?: string;
  songImg?: string;
  stats?: SongStatsType;
  album?: AlbumType;
};

// in "stats"
export type SongStatsType = {
  concurrents?: number;
  pageviews?: number;
  verified_annotations?: number;
  transcribers?: number;
};

export type AlbumType = {
  cover_art_url?: string;
  name?: string;
  id?: number;
};

// in "primary_artist"
export type ArtistType = {
  id: number;
  artist: string;
  image_url?: string;
};

export type ArtistPageType = {
  id: number;
  name: string;
  image_url?: string;
  description?: string;
  facebook_name?: string;
  followers_count?: number;
  instagram_name?: string;
};

export type SongsContextType = {
  state: SongType[];
  current: number | null;
};
