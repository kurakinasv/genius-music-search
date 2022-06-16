import { FC } from 'react';

import { getElementsArray } from '@utils/getElementsArray';

import skeleton from './ArtistPageLoader.module.scss';

const ArtistPageLoader: FC = () => {
  return (
    <>
      <div className={skeleton.image} />

      <div className={skeleton.info}>
        <div className={skeleton.title} />
        <div className={skeleton.stats}>
          {getElementsArray(<div className={skeleton.stats_item} />, 3)}
        </div>
        <div className={skeleton.description} />
      </div>
    </>
  );
};

export default ArtistPageLoader;
