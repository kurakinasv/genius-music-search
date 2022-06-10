import { createContext } from 'react';

import ArtistPage from '@pages/ArtistPage';
import SearchPage from '@pages/SearchPage';
import SongPage from '@pages/SongPage';
import Store from '@store/Store';
import { MainInfoType } from '@type/types';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const SongsContext = createContext<{
  searchState: MainInfoType[];
  currentEndpoint: number | null;
}>({
  searchState: [],
  currentEndpoint: null,
});

const SongsContextProvider = SongsContext.Provider;

const App = () => {
  const store = new Store();

  const value = {
    searchState: store.searchState,
    currentEndpoint: store.currentId,
  };

  return (
    <BrowserRouter>
      <SongsContextProvider value={value}>
        <Routes>
          <Route index element={<SearchPage />} />
          <Route path="song/:id" element={<SongPage />} />
          <Route path="artist/:id" element={<ArtistPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </SongsContextProvider>
    </BrowserRouter>
  );
};

export default App;
