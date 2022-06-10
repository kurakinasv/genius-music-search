import { memo, useContext } from 'react';

import { SongsContext } from '@app/App';
import Store from '@store/Store';
import { ArtistType } from '@type/types';
import { Link, useNavigate } from 'react-router-dom';

import s from './SongCard.module.scss';

export type SongCardType = {
  id: number;
  title: string;
  artistInfo: ArtistType;
};

const SongCard: React.FC<SongCardType> = ({ id, title, artistInfo }) => {
  const navigate = useNavigate();

  const context = useContext(SongsContext);

  const store = new Store();

  const songClickHandler = () => {
    navigate(`/song/${id}`);

    context.currentEndpoint = id;
    store.setCurrentId(id);
  };

  const artistClickHandler = () => {
    context.currentEndpoint = artistInfo.id;
    store.setCurrentId(artistInfo.id);
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
          Перейти к описанию
        </div>
      </div>
    </>
  );
};

export default memo(SongCard);
