import { Link } from 'react-router-dom';

import s from './ArtistCard.module.scss';

const ArtistCard = () => {
  let id = (Math.random() * 10000).toFixed();

  return (
    <>
      <div className={s.item}>
        <div className={s.content}>
          <div className={s.title}>Artist Name</div>
        </div>

        <div className={s.link}>
          <Link to={`/artist/${id}`}>Перейти к исполнителю</Link>
        </div>
      </div>
    </>
  );
};

export default ArtistCard;
