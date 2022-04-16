import {
  FormEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from 'react';

import { SongsContext } from '@app/App';
import ArtistCard from '@components/ArtistCard';
import SongCard from '@components/SongCard';
import { RequestTypes, store } from '@store/store';
import { SongsContextType } from '@type/types';

import s from './SearchPage.module.scss';

const SearchPage: React.FC = () => {
  const [value, setValue] = useState('');

  const songContext = useContext<SongsContextType>(SongsContext);
  const state = songContext.state;

  const clickHandler = async () => {
    if (!value) return;

    try {
      const res: [] = await store.reqSearchData(value, RequestTypes.SEARCH);

      const data = res.map(({ result }) => {
        const {
          id,
          title,
          artist_names: artist,
          annotation_count: annotationCount,
          song_art_image_url: songImg,
          stats,
          primary_artist: artistInfo,
        } = result;

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

      songContext.state = data;
    } catch (error: any) {
      console.log('error in clickHandler:', error.message);
    }

    setValue('');
  };

  useEffect(() => {
    console.log('store result useeffect', state);
  }, [state]);

  const inputHandler = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const keyHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') clickHandler();
  };

  const songsArray = state.map(({ id, title, artist }) => (
    <SongCard key={id} id={id} title={title} artist={artist} />
  ));

  return (
    <div className={s.container}>
      <h2>Search page</h2>

      <div className={s.search}>
        <input
          type="text"
          value={value}
          onChange={inputHandler}
          onKeyUp={keyHandler}
          placeholder="Enter song or artist..."
        />
        <button onClick={clickHandler}>Search</button>
      </div>

      <div className={s.wrapper}>
        {state.length > 0 && <ArtistCard {...state[0]} />}
        {state.length > 0 && <div className={s.cards}>{songsArray}</div>}
      </div>
    </div>
  );
};

export default SearchPage;
