import { FC } from 'react';

import { getElementsArray } from '@utils/getElementsArray';

import skeleton from './SongCardsLoader.module.scss';

const SongCardsLoader: FC = () => {
  return (
    <div className={skeleton.cards}>
      {getElementsArray(<div className={skeleton.cards_item} />, 3)}
    </div>
  );
};

export default SongCardsLoader;
