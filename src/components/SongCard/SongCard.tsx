import { useContext } from 'react';

import { SongsContext } from '@app/App';
import { SongsContextType, SongType } from '@type/types';
import { Link, useNavigate } from 'react-router-dom';

import s from './SongCard.module.scss';

const SongCard: React.FC<SongType> = ({ id, title, artist }) => {
  const navigate = useNavigate();

  const songContext = useContext<SongsContextType>(SongsContext);

  const clickHandler = () => {
    navigate(`/song/${id}`);
    songContext.current = id;
  };

  return (
    <>
      <div className={s.item}>
        <div className={s.content}>
          <div className={s.title}>{title}</div>
          <Link to={`/artist/${id}`} className={s.artist}>
            {artist}
          </Link>
        </div>

        <div className={s.link} onClick={clickHandler}>
          Перейти к описанию
        </div>
      </div>
    </>
  );
};

export default SongCard;
