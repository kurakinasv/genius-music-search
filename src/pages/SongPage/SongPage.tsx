import { Link, useLocation } from 'react-router-dom';

import { SongType } from '../../types/types';
import s from './SongPage.module.scss';

const SongPage = () => {
  const location = useLocation();
  const state = location.state as SongType; // Type Casting

  return (
    <>
      <div className={s.container}>
        <Link to="/" className={s.arrow}></Link>
        <div className={s.wrapper}>
          <div className={s.image}>
            <img src="http://placekitten.com/670" alt="" />
          </div>

          <div className={s.info}>
            <div className={s.title}>{state.title}</div>
            <div className={s.artist}>{state.artist}</div>
            <div className={s.stats}>
              <div className={s.stats__icon}>
                <img src="http://placekitten.com/20" alt="" />
              </div>
              <div className={s.stats__text}>stats {state.id}</div>
            </div>
            <div className={s.description}>
              Что же есть зло? Ужасное проявление самых отвратительных качеств
              человека. Именно о таком зле и говорится в песне. Перед нами
              предстанет картина, в которой молодой человек будет творить
              ужасные вещи ради получения собственной выгоды, а именно —
              получение девушки.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongPage;
