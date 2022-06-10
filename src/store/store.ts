import { options, BASE_URL, plain } from '@config/apiConfig';
import { defaultArtistData, defaultSongData } from '@config/defaultValues';
import {
  ArtistPageType,
  RequestTypes,
  SongPageType,
  MainInfoType,
} from '@type/types';

class Store {
  options = options;
  BASE_URL = BASE_URL;
  plain = plain;

  searchState: MainInfoType[] = [];
  currentId: number | null = null;

  currentSongData: SongPageType = defaultSongData;
  currentArtistData: ArtistPageType = defaultArtistData;

  isLoading = false;

  setSearchState(data: MainInfoType[]) {
    this.searchState = data;
  }

  setCurrentId(id: number) {
    this.currentId = id;
  }

  getSearchData = async (query: string) => {
    this.isLoading = true;

    try {
      const url = this.BASE_URL + RequestTypes.SEARCH + query;

      const response = await fetch(url, this.options);

      const data = await response.json();

      const result = data.response.hits.map((item: Record<string, any>) => {
        const {
          id,
          title,
          artist_names: artist,
          annotation_count: annotationCount,
          song_art_image_url: songImg,
          stats,
          primary_artist: artistInfo,
        } = item.result;

        return {
          id,
          title,
          artist,
          annotationCount,
          songImg,
          stats,
          artistInfo,
        };
      });

      this.setSearchState(result);
    } catch (error: any) {
      console.error('getSearchData', error);
    }

    this.isLoading = false;
  };

  getSongData = async (currentId: number) => {
    this.isLoading = true;

    try {
      const url = this.BASE_URL + RequestTypes.SONG + currentId + this.plain;

      const response = await fetch(url, this.options);

      const data = await response.json();

      const {
        id,
        title,
        artist_names: artist,
        annotation_count: annotationCount,
        release_date_for_display: date,
        song_art_image_url: songImg,
        stats,
        album,
        description,
      } = data.response.song;

      this.currentSongData = {
        id,
        title,
        artist,
        annotationCount,
        date,
        songImg,
        stats,
        album,
        description,
      };
    } catch (error: any) {
      console.log('getSongData', error);
    }

    this.isLoading = false;
  };

  getArtistData = async (currentId: number) => {
    this.isLoading = true;

    try {
      const url = this.BASE_URL + RequestTypes.ARTIST + currentId + this.plain;

      const response = await fetch(url, this.options);

      const data = await response.json();

      const {
        id,
        name,
        image_url,
        facebook_name,
        instagram_name,
        followers_count,
        description,
      } = data.response.artist;

      this.currentArtistData = {
        id,
        name,
        image_url,
        facebook_name,
        instagram_name,
        followers_count,
        description,
      };
    } catch (error: any) {
      console.log('getArtistData', error);
    }

    this.isLoading = false;
  };
}

export default Store;
