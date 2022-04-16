import { ArtistPageType, SongPageType, SongType } from '@type/types';

interface IStore {
  options: object;
  BASE_URL: string;
  reqSearchData: (value: string, type?: RequestTypes) => Promise<[]>;
  state: SongType[];
  currentId: number | null;
  currentData: Partial<SongPageType & ArtistPageType> | null;
  getSongsState: () => SongType[];
  getCurrentId: () => number | null;
  setSongsState: (state: SongType[]) => void;
  setCurrentId: (current: number) => void;
}

export enum RequestTypes {
  SEARCH = 'search?q=',
  SONG = 'songs/',
  ARTIST = 'artists/',
}

export const store: IStore = {
  options: {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'genius.p.rapidapi.com',
      'X-RapidAPI-Key': '9423114bedmshdb4787265158ed3p16910bjsn8b2ca0679646',
    },
  },

  BASE_URL: 'https://genius.p.rapidapi.com/',

  reqSearchData: async (value: string, type) => {
    const url = store.BASE_URL + type + value;

    try {
      let response = await fetch(url, store.options);
      let data = await response.json();

      switch (type) {
        case RequestTypes.SEARCH:
          return data.response.hits;
        case RequestTypes.SONG: {
          console.log('data', data.response.song);
          return data.response.song;
        }
        case RequestTypes.ARTIST:
          return data.response.artist;
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      return [];
    }
  },

  state: [],

  currentId: null,

  currentData: null,

  getSongsState: () => {
    return store.state;
  },

  getCurrentId: () => {
    return store.currentId;
  },

  setSongsState: (state) => {
    store.state = state;
  },

  setCurrentId: (current) => {
    store.currentId = current;
  },
};
