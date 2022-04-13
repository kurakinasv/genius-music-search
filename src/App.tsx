import { createContext, useState } from 'react';

import ArtistPage from '@pages/ArtistPage';
import SearchPage from '@pages/SearchPage';
import SongPage from '@pages/SongPage';
import { store } from '@store/store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { SongsContextType, SongType } from './types/types';

export const SongsContext = createContext<SongsContextType | null>({
  state: store.getState(),
  setState: (state: SongType[]) => store.setSongsState(state),
});

const SongsContextProvider = SongsContext.Provider;

function App() {
  const [state, setState] = useState(store.getState());

  return (
    <BrowserRouter>
      <SongsContextProvider value={{ state, setState }}>
        <Routes>
          <Route index element={<SearchPage />} />
          <Route path="song/:id" element={<SongPage />} />
          <Route path="artist/:id" element={<ArtistPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </SongsContextProvider>
    </BrowserRouter>
  );
}

export default App;
