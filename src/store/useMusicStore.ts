import { useRef } from 'react';

import MusicStore from './Store';

const useMusicStore = () => {
  const store = useRef<null | MusicStore>(null);

  if (store.current === null) {
    store.current = new MusicStore();
  }

  return store.current;
};

export default useMusicStore;
