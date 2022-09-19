import { useContext, useEffect, useMemo, useState } from 'react';

import { musicContext } from '@app/App';
import ArtistCard from '@components/ArtistCard';
import ScrollOnTopButton from '@components/ScrollOnTopButton';
import SongCard from '@components/SongCard';
import useMusicStore from '@store/useMusicStore';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';

import InputComponent from './InputComponent';
import s from './SearchPage.module.scss';
import SearchPageLoader from './SearchPageLoader';
import SongCardsLoader from './SongCardsLoader';

const SearchPage: React.FC = () => {
  const context = useContext(musicContext);
  const { searchState } = context;
  const [hasMore, setHasMore] = useState(true);
  const [showHeader, setShowHeader] = useState(false);

  const musicStore = useMusicStore();

  const clickHandler = async (value: string) => {
    if (!value) return;

    context.currentPage = 1;
    await musicStore.getSearchData(value, 1);
    document.documentElement.scrollTo(0, 0);

    context.searchState = musicStore.searchState;
    context.currentQuery = value;
  };

  const getScrollResults = async (): Promise<void> => {
    context.currentPage += 1;

    await musicStore.getSearchData(context.currentQuery, context.currentPage);

    if (musicStore.searchState.length) {
      context.searchState = context.searchState.concat(musicStore.searchState);
    } else setHasMore(false);
  };

  const songsArray = useMemo(
    () => searchState.map((props) => <SongCard key={props.id} {...props} />),
    [searchState]
  );

  const addHeader = () => {
    const header = document.getElementsByTagName('header')[0];

    if (window.scrollY > 250) {
      setShowHeader(true);
      if (header) header.style.opacity = '1';
    } else {
      if (header) header.style.opacity = '0';
      setShowHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', addHeader);
    return () => window.removeEventListener('scroll', addHeader);
  }, []);

  return (
    <>
      {showHeader && (
        <header className={s.header}>
          <h1 className={s.query}>"{context.currentQuery}"</h1>
          <InputComponent
            clickHandler={clickHandler}
            disabled={musicStore.isLoading}
          />
        </header>
      )}

      <div className={s.container}>
        <InputComponent
          clickHandler={clickHandler}
          disabled={musicStore.isLoading}
        />

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
