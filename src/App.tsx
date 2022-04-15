import { createContext } from 'react';

import ArtistPage from '@pages/ArtistPage';
import SearchPage from '@pages/SearchPage';
import SongPage from '@pages/SongPage';
import { store } from '@store/store';
import { SongsContextType } from '@type/types';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export const SongsContext = createContext<SongsContextType>({
  state: store.getSongsState(),
  current: store.getCurrentId(),
});

const SongsContextProvider = SongsContext.Provider;

const App = () => {
  const value = {
    state: store.getSongsState(),
    current: store.getCurrentId(),
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
