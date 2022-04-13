import { SongType } from '../types/types';

interface IStore {
  options: object;
  reqSearchData: (value: string) => Promise<[]>;
  state: SongType[];
  getState: () => SongType[];
  setSongsState: (props: SongType[]) => void;
}

export let store: IStore = {
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

  getState: (): any => {
    return store.state;
  },

  setSongsState: (props: SongType[]) => {
    store.state = props;
  },
};
