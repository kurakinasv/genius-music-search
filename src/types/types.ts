export enum RequestTypes {
  SEARCH = 'search?q=',
  SONG = 'songs/',
  ARTIST = 'artists/',
}

export type MainInfoType = {
  id: number;
  title: string;
  artist: string;

  annotationCount?: number;
  songImg?: string;
  stats?: SongStatsType;
  artistInfo: ArtistType;
};

export type SongPageType = {
  id: number;
  title: string;
  artist: string;

  annotationCount?: number;
  songImg?: string;
  stats?: SongStatsType;

  description: Record<string, string>;
  apple_music_id?: string;
  apple_music_player_url?: string;
  date?: string;
  album?: AlbumType;
  media?: any[];
};

export type ArtistPageType = {
  id: number;
  name: string;
  description: Record<string, string>;

  image_url?: string;
  facebook_name?: string;
  followers_count?: number;
  instagram_name?: string;
};

// in "stats"
export type SongStatsType = {
  concurrents: number;
  pageviews: number;
  verified_annotations: number;
  transcribers: number;
};

// in "primary_artist"
export type ArtistType = {
  id: number;
  name: string;
  image_url?: string;
};

// in "album"
export type AlbumType = {
  id: number;
  name: string;
  cover_art_url: string;
};
