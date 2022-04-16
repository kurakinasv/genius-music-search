import { useContext, useEffect, useState } from 'react';

import { SongsContext } from '@app/App';
import { RequestTypes, store } from '@store/store';
import { SongsContextType } from '@type/types';
import { Link } from 'react-router-dom';

import s from './SongPage.module.scss';

const SongPage: React.FC = () => {
  const songContext = useContext<SongsContextType>(SongsContext);
  const current = `${songContext.current}`;
  const data = store.currentData;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getSongData = async () => {
    console.log('getSongData');

    try {
      const res: any = await store.reqSearchData(current, RequestTypes.SONG);

      const {
        id,
        title,
        artist_names: artist,
        annotatio_count: annotationCount,
        release_date_for_display: date,
        song_art_image_url: songImg,
        stats,
        album,
        description,
      } = res;

      store.currentData = {
        id,
        title,
        artist,
        annotationCount,
        date,
        songImg,
        stats,
        album,
        description,
      };
      setIsLoading(false);
    } catch (error: any) {
      console.log('error in songPage:', error.message);
    }
  };

  const descriptionNormalizer = () => {
    console.log(data?.description?.dom.children[0].children[0]);
    let dom = data?.description?.dom;
    for (let child in dom.children) {
      console.log(child);
    }
  };

  getSongData()
    .then(() => console.log(store.currentData))
    .then(() => descriptionNormalizer());

  return (
    <>
      {!isLoading && (
        <div className={s.container}>
          <Link to="/" className={s.arrow}></Link>
          <div className={s.wrapper}>
            <div className={s.image}>
              <img src={data?.songImg} alt={`${data?.title} cover`} />
            </div>

            <div className={s.info}>
              <div className={s.title}>{data?.title}</div>
              <div className={s.artist}>{data?.artist}</div>
              <div className={s.stats}>
                <div className={s.stats__icon}>
                  <img src="http://placekitten.com/20" alt="" />
                </div>
                {data?.annotationCount! > 0 && (
                  <div className={s.stats__text}>
                    {data?.annotationCount} annotations
                  </div>
                )}
                <div className={s.stats__text}>
                  {data?.stats?.pageviews} pageviews on Genius, released{' '}
                  {data?.date}
                </div>
              </div>
              <div>
                {data?.album?.name}
                <img
                  src={data?.album?.cover_art_url}
                  alt={`${data?.album?.name} cover`}
                  width="100px"
                />
              </div>
              {/* <div className={s.description}>
                Что же есть зло? Ужасное проявление самых отвратительных качеств
                человека. Именно о таком зле и говорится в песне. Перед нами
                предстанет картина, в которой молодой человек будет творить
                ужасные вещи ради получения собственной выгоды, а именно —
                получение девушки.
              </div> */}
            </div>
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default SongPage;
