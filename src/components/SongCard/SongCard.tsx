import { Link, useNavigate } from 'react-router-dom';

import { SongType } from '../../types/types';
import s from './SongCard.module.scss';

const SongCard: React.FC<SongType> = ({ id, title, artist }: SongType) => {
  let navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/song/${id}`, {
      replace: false,
      state: { id, title, artist },
    });
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
