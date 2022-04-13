import { useContext, useEffect, useState } from 'react';

import ArtistCard from '@components/ArtistCard';
import Button from '@components/Button';
import Input from '@components/Input';
import SongCard from '@components/SongCard';
import { store } from '@store/store';

import { SongsContext } from '../../App';
import { SongsContextType, SongType } from '../../types/types';
import s from './SearchPage.module.scss';

const SearchPage = () => {
  const [value, setValue] = useState('');

  const songContext = useContext<SongsContextType | null>(SongsContext);
  let state = songContext?.state;

  const clickHandler = () => {
    if (!value) return;

    store
      .reqSearchData(value)
      .then((res) =>
        songContext?.setState(
          res.map((song: { result: SongType }) => ({
            id: song.result.id,
            title: song.result.title,
            artist: song.result.artist_names,
            artist_names: song.result.artist_names,
          }))
        )
      )
      .catch((e) => console.log('error:', e.message));
    setValue('');
  };

  useEffect(() => {
    console.log('store result useeffect', songContext?.state);
  }, [songContext?.state]);

  const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  let songsArray = state?.map((song) => (
    <SongCard
      key={song.id}
      id={song.id}
      title={song.title}
      artist={song.artist}
      artist_names={''}
    />
  ));

  return (
    <div className={s.container}>
      <h2>Search page</h2>

      <div>
        <input type="text" value={value} onChange={inputHandler} />
        <button onClick={clickHandler}>Search</button>
      </div>

      <div className={s.wrapper}>
        {/* maybe undefined error */}
        {songContext!.state.length > 0 && (
          <div className={s.cards}>{songsArray}</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
