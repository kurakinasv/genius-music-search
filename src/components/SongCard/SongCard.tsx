import { useContext } from 'react';

import { musicContext } from '@app/App';
import { ArtistType } from '@type/types';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';

import s from './SongCard.module.scss';

export type SongCardType = {
  id: number;
  title: string;
  artistInfo: ArtistType;
};

const SongCard: React.FC<SongCardType> = ({ id, title, artistInfo }) => {
  const navigate = useNavigate();

  const context = useContext(musicContext);

  const songClickHandler = () => {
    navigate(`/song/${id}`);

    context.currentEndpoint = id;
  };

  const artistClickHandler = () => {
    context.currentEndpoint = artistInfo.id;
  };

  return (
    <>
      <div className={s.item}>
        <div className={s.content}>
          <div className={s.title}>{title}</div>
          <Link
            to={`/artist/${artistInfo.id}`}
            className={s.artist}
            onClick={artistClickHandler}
          >
            {artistInfo.name}
          </Link>
        </div>

        <div className={s.link} onClick={songClickHandler}>
          <span>Перейти к описанию</span>
        </div>
      </div>
    </>
  );
};

export default observer(SongCard);
