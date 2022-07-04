import { FC } from 'react';

import { getElementsArray } from '@utils/getElementsArray';

import SongCardsLoader from '../SongCardsLoader';
import skeleton from './SearchPageLoader.module.scss';

const SearchPageLoader: FC = () => {
  return (
    <>
      <div className={skeleton.title} />
      <div className={skeleton.artist} />
      {getElementsArray(<SongCardsLoader />, 2)}
    </>
  );
};

export default SearchPageLoader;
