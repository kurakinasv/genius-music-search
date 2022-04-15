export type SongType = {
  id: number;
  title: string;
  artist: string;
  artist_names?: string;

  annotation_count?: number;
  header_image_url?: string;
  song_art_image_url?: string;
  // in "stats"
  concurrents?: number;
  pageviews?: number;
};

// in "primary_artist"
export type ArtistType = {
  id: number;
  image_url: string;
  name: string;
};

export type SongsContextType = {
  state: SongType[];
  current: number | null;
};
