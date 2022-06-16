import { createContext, FC } from 'react';

import ArtistPage from '@pages/ArtistPage';
import SearchPage from '@pages/SearchPage';
import SongPage from '@pages/SongPage';
import { MainInfoType } from '@type/types';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

type MusicContext = {
  searchState: MainInfoType[];
  currentEndpoint: number | null;
  currentQuery: string;
};

export const musicContext = createContext<MusicContext>({
  searchState: [],
  currentEndpoint: null,
  currentQuery: '',
});

const MusicContextProvider = musicContext.Provider;

const App: FC = () => {
  const value = {
    searchState: [],
    currentEndpoint: null,
    currentQuery: '',
  };

  return (
    <BrowserRouter>
      <MusicContextProvider value={value}>
        <Routes>
          <Route index element={<SearchPage />} />
          <Route path="song/:id" element={<SongPage />} />
          <Route path="artist/:id" element={<ArtistPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </MusicContextProvider>
    </BrowserRouter>
  );
};

export default App;
