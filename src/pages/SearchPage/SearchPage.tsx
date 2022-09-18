import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { musicContext } from '@app/App';
import ArtistCard from '@components/ArtistCard';
import ScrollOnTopButton from '@components/ScrollOnTopButton';
import SongCard from '@components/SongCard';
import useMusicStore from '@store/useMusicStore';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';

import s from './SearchPage.module.scss';
import SearchPageLoader from './SearchPageLoader';
import SongCardsLoader from './SongCardsLoader';

const SearchPage: React.FC = () => {
  const context = useContext(musicContext);
  const { searchState } = context;
  const [hasMore, setHasMore] = useState(true);

  const musicStore = useMusicStore();

  const [value, setValue] = useState('');

  const clickHandler = async () => {
    if (!value) return;

    context.currentPage = 1;
    await musicStore.getSearchData(value, 1);

    context.searchState = musicStore.searchState;
    context.currentQuery = value;

    setValue('');
  };

  const getScrollResults = async (): Promise<void> => {
    context.currentPage += 1;

    await musicStore.getSearchData(context.currentQuery, context.currentPage);

    if (musicStore.searchState.length) {
      context.searchState = context.searchState.concat(musicStore.searchState);
    } else setHasMore(false);
  };

  const inputHandler = useCallback((event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  }, []);

  const onEnterPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') clickHandler();
  };

  const songsArray = useMemo(
    () => searchState.map((props) => <SongCard key={props.id} {...props} />),
    [searchState]
  );

  return (
    <>
      <div className={s.container}>
        <div className={s.search}>
          <input
            type="text"
            value={value}
            onChange={inputHandler}
            onKeyUp={onEnterPress}
            placeholder="Поиск песни или исполнителя..."
            disabled={musicStore.isLoading}
          />
          <button onClick={clickHandler} disabled={musicStore.isLoading}>
            Найти
          </button>
        </div>

        {musicStore.isLoading && context.currentPage === 1 && (
          <SearchPageLoader />
        )}

        {musicStore.isLoading && context.currentPage > 1 && (
          <>
            <ArtistCard {...searchState[0]} />
            <div className={s.cards}>{songsArray}</div>
          </>
        )}

        <InfiniteScroll
          dataLength={searchState.length}
          next={getScrollResults}
          hasMore={hasMore}
          loader={<SongCardsLoader />}
          scrollThreshold="100%"
          style={{ overflowX: 'hidden' }}
        >
          {!musicStore.isLoading && !!context.currentQuery && (
            <h1 className={s.query}>"{context.currentQuery}"</h1>
          )}

          {!musicStore.isLoading && !!searchState.length && (
            <>
              <ArtistCard {...searchState[0]} />
              <div className={s.cards}>{songsArray}</div>
            </>
          )}
        </InfiniteScroll>
      </div>

      <ScrollOnTopButton />
    </>
  );
};

export default observer(SearchPage);
