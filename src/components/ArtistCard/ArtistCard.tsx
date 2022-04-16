import { useContext } from 'react';

import { SongsContext } from '@app/App';
import { ArtistType, SongType } from '@type/types';
import { Link, useNavigate } from 'react-router-dom';

import s from './ArtistCard.module.scss';

const ArtistCard: React.FC<SongType> = ({ artistInfo, artist }) => {
  const navigate = useNavigate();
  const artistContext = useContext(SongsContext);
  const clickHandler = () => {
    navigate(`/artist/${artistInfo?.id}`);
    artistContext.current = artistInfo!.id;
  };

  return (
    <>
      <div className={s.item}>
        <div className={s.content}>
          <div className={s.title}>{artist}</div>
        </div>

        <div className={s.link} onClick={clickHandler}>
          Перейти к исполнителю
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
