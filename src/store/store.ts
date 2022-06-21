import { BASE_URL } from '@config/apiConfig';
import { defaultArtistData, defaultSongData } from '@config/defaultValues';
import {
  ArtistPageType,
  RequestTypes,
  SongPageType,
  MainInfoType,
} from '@type/types';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';

type PrivateFields = '_isLoading';

class MusicStore {
  private readonly BASE_URL = BASE_URL;

  searchState: MainInfoType[] = [];

  currentSongData: SongPageType = defaultSongData;
  currentArtistData: ArtistPageType = defaultArtistData;

  private _isLoading = false;

  constructor() {
    makeObservable<MusicStore, PrivateFields>(this, {
      _isLoading: observable,
      isLoading: computed,

      getSearchData: action,
      getSongData: action,
      getArtistData: action,

      setSearchState: action,
    });
  }

  get isLoading() {
    return this._isLoading;
  }

  setSearchState(data: MainInfoType[]) {
    this.searchState = data;
  }

  getSearchData = async (query: string) => {
    this._isLoading = true;

    try {
      const url = this.BASE_URL + RequestTypes.SEARCH + query;

      const response = await fetch(url);

      const data = await response.json();

      runInAction(() => {
        const result = data.map((item: Record<string, any>) => {
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
      });
    } catch (error: any) {
      console.error('getSearchData', error);
    }

    runInAction(() => {
      this._isLoading = false;
    });
  };

  getSongData = async (currentId: number) => {
    this._isLoading = true;

    try {
      const url = this.BASE_URL + RequestTypes.SONG + currentId;

      const response = await fetch(url);

      const data = await response.json();

      runInAction(() => {
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
          apple_music_id,
          apple_music_player_url,
          media,
        } = data;

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
          apple_music_id,
          apple_music_player_url,
          media,
        };
      });
    } catch (error: any) {
      console.log('getSongData', error);
    }

    runInAction(() => {
      this._isLoading = false;
    });
  };

  getArtistData = async (currentId: number) => {
    this._isLoading = true;

    try {
      const url = this.BASE_URL + RequestTypes.ARTIST + currentId;

      const response = await fetch(url);

      const data = await response.json();

      runInAction(() => {
        const {
          id,
          name,
          image_url,
          facebook_name,
          instagram_name,
          followers_count,
          description,
        } = data;

        this.currentArtistData = {
          id,
          name,
          image_url,
          facebook_name,
          instagram_name,
          followers_count,
          description,
        };
      });
    } catch (error: any) {
      console.log('getArtistData', error);
    }

    runInAction(() => {
      this._isLoading = false;
    });
  };
}

export default MusicStore;
