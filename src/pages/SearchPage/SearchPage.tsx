import { FormEvent, KeyboardEvent, useContext, useState } from 'react';

import { SongsContext } from '@app/App';
import ArtistCard from '@components/ArtistCard';
import SongCard from '@components/SongCard';
import Store from '@store/Store';

import s from './SearchPage.module.scss';

const SearchPage: React.FC = () => {
  const context = useContext(SongsContext);
  const { searchState } = context;

  const store = new Store();

  const [value, setValue] = useState('');

  const clickHandler = async () => {
    if (!value) return;

    await store.getSearchData(value);

    context.searchState = store.searchState;

    setValue('');
  };

  const inputHandler = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const onEnterPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') clickHandler();
  };

  const songsArray = searchState.map((props) => (
    <SongCard key={props.id} {...props} />
  ));

  return (
    <div className={s.container}>
      <h2>Search page</h2>

      <div className={s.search}>
        <input
          type="text"
          value={value}
          onChange={inputHandler}
          onKeyUp={onEnterPress}
          placeholder="Enter song or artist..."
        />
        <button onClick={clickHandler}>Search</button>
      </div>

      <div className={s.wrapper}>
        {!!searchState.length && (
          <>
            <ArtistCard {...searchState[0]} />
            <div className={s.cards}>{songsArray}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
