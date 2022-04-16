import { useContext, useState } from 'react';

import { SongsContext } from '@app/App';
import { ArtistPageType } from '@app/types/types';
import { RequestTypes, store } from '@store/store';
import { Link } from 'react-router-dom';

import s from './ArtistPage.module.scss';

const ArtistPage: React.FC = () => {
  const artistContext = useContext(SongsContext);
  // const state = artistContext.state.filter(
  //   (song) => song.id === artistContext.current
  // )[0];

  const current = `${artistContext.current}`;
  const data = store.currentData;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getArtistData = async () => {
    console.log('getArtistData');

    try {
      const res: any = await store.reqSearchData(current, RequestTypes.ARTIST);

      const {
        id,
        name,
        image_url,
        facebook_name,
        instagram_name,
        followers_count,
      } = res;

      store.currentData = {
        id,
        name,
        image_url,
        facebook_name,
        instagram_name,
        followers_count,
      };
      setIsLoading(false);
    } catch (error: any) {
      console.log('error in songPage:', error.message);
    }
  };

  getArtistData();

  return (
    <>
      {!isLoading && (
        <div className={s.container}>
          <Link to="/" className={s.arrow}></Link>
          <div className={s.wrapper}>
            <div className={s.image}>
              <img src={data?.image_url} alt={data?.name} />
            </div>

            <div className={s.info}>
              <div className={s.title}>{data?.name}</div>
              <div className={s.stats}>
                <div className={s.stats__icon}>
                  <img src="http://placekitten.com/20" alt="" />
                </div>
                <div className={s.stats__text}>
                  {data?.facebook_name && (
                    <p>facebook: {data?.facebook_name}</p>
                  )}
                  {data?.instagram_name && (
                    <p>instagram: {data?.instagram_name}</p>
                  )}
                  {data?.followers_count && (
                    <p>followers: {data?.followers_count}</p>
                  )}
                </div>
              </div>
              {/* <div className={s.description}>
                Электрофорез — дуэт, основанный в 2012 году и ставший одним из
                самых примечательных явлений на петербургской (и не только)
                сцене. Музыка группы — сочетание жёсткого синти-попа,
                танцевальной электроники и интригующих текстов. Состав группы:
                Иван Курочкин и Виталий Талызин. Тексты и музыку пишут вместе,
                базируются в Санкт-Петербурге, где и родились. Участники
                «Электрофореза» 10 лет учились вместе в одном классе.
              </div> */}
            </div>
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default ArtistPage;
