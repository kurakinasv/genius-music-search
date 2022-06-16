import { FC } from 'react';

import { getElementsArray } from '@utils/getElementsArray';

import skeleton from './SearchPageLoader.module.scss';

const SearchPageLoader: FC = () => {
  return (
    <>
      <div className={skeleton.title} />
      <div className={skeleton.artist} />
      <div className={skeleton.cards}>
        {getElementsArray(<div className={skeleton.cards_item} />, 10)}
      </div>
    </>
  );
};

export default SearchPageLoader;
