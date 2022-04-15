import { SongType } from '@type/types';

interface IStore {
  options: object;
  reqSearchData: (value: string) => Promise<[]>;
  state: SongType[];
  currentId: number | null;
  getSongsState: () => SongType[];
  getCurrentId: () => number | null;
  setSongsState: (state: SongType[]) => void;
  setCurrentId: (current: number) => void;
}

export const store: IStore = {
  options: {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'genius.p.rapidapi.com',
      'X-RapidAPI-Key': '9423114bedmshdb4787265158ed3p16910bjsn8b2ca0679646',
    },
  },

  reqSearchData: async (value: string) => {
    const url = `https://genius.p.rapidapi.com/search?q=${value}`;

    try {
      let response = await fetch(url, store.options);
      let data = await response.json();
      return data.response.hits;
    } catch (error: any) {
      console.error('Error:', error.message);
      return [];
    }
  },

  state: [],

  currentId: null,

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
