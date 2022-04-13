import { Link } from 'react-router-dom';

import s from './ArtistPage.module.scss';

const ArtistPage = () => {
  return (
    <>
      <div className={s.container}>
        <Link to="/" className={s.arrow}></Link>
        <div className={s.wrapper}>
          <div className={s.image}>
            <img src="http://placekitten.com/670" alt="" />
          </div>

          <div className={s.info}>
            <div className={s.title}>Artist Name</div>
            <div className={s.stats}>
              <div className={s.stats__icon}>
                <img src="http://placekitten.com/20" alt="" />
              </div>
              <div className={s.stats__text}>stats</div>
            </div>
            <div className={s.description}>
              Электрофорез — дуэт, основанный в 2012 году и ставший одним из
              самых примечательных явлений на петербургской (и не только) сцене.
              Музыка группы — сочетание жёсткого синти-попа, танцевальной
              электроники и интригующих текстов. Состав группы: Иван Курочкин и
              Виталий Талызин. Тексты и музыку пишут вместе, базируются в
              Санкт-Петербурге, где и родились. Участники «Электрофореза» 10 лет
              учились вместе в одном классе.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistPage;
