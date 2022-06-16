import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useState,
} from 'react';

import { musicContext } from '@app/App';
import ArtistCard from '@components/ArtistCard';
import SongCard from '@components/SongCard';
import useMusicStore from '@store/useMusicStore';
import { observer } from 'mobx-react-lite';

import s from './SearchPage.module.scss';
import SearchPageLoader from './SearchPageLoader';

const SearchPage: React.FC = () => {
  const context = useContext(musicContext);
  const { searchState } = context;

  const musicStore = useMusicStore();

  const [value, setValue] = useState('');

  const clickHandler = async () => {
    if (!value) return;

    await musicStore.getSearchData(value);

    context.searchState = musicStore.searchState;
    context.currentQuery = value;

    setValue('');
  };

  const inputHandler = useCallback((event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  }, []);

  const onEnterPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') clickHandler();
  };

  const songsArray = searchState.map((props) => (
    <SongCard key={props.id} {...props} />
  ));

  return (
    <div className={s.container}>
      <div className={s.search}>
        <input
          type="text"
          value={value}
          onChange={inputHandler}
          onKeyUp={onEnterPress}
          placeholder="Enter song or artist..."
          disabled={musicStore.isLoading}
        />
        <button onClick={clickHandler} disabled={musicStore.isLoading}>
          Search
        </button>
      </div>

      {musicStore.isLoading && <SearchPageLoader />}

      {!musicStore.isLoading && !!context.currentQuery && (
        <h1 className={s.query}>"{context.currentQuery}"</h1>
      )}

      {!musicStore.isLoading && !!searchState.length && (
        <>
          <ArtistCard {...searchState[0]} />
          <div className={s.cards}>{songsArray}</div>
        </>
      )}
    </div>
  );
};

export default observer(SearchPage);
