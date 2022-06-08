import { useContext, useEffect, useState } from 'react';

import { SongsContext } from '@app/App';
import AlbumIcon from '@icons/AlbumIcon';
import AnnotationsIcon from '@icons/AnnotationsIcon';
import PlayIcon from '@icons/PlayIcon';
import ReleaseDateIcon from '@icons/ReleaseDateIcon';
import ViewsIcon from '@icons/ViewsIcon';
import { RequestTypes, store } from '@store/store';
import { SongsContextType } from '@type/types';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

import s from './SongPage.module.scss';

const SongPage: React.FC = () => {
  const songContext = useContext<SongsContextType>(SongsContext);
  const current = `${songContext.current}`;
  const data = store.currentData;

  const [isLoading, setIsLoading] = useState(true);

  const getSongData = async () => {
    try {
      const res: any = await store.reqSearchData(current, RequestTypes.SONG);

      const {
        id,
        title,
        artist_names: artist,
        annotation_count: annotationCount,
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

  useEffect(() => {
    getSongData();
  }, []);

  const getSongDescription = () => {
    // 8 - check for <p>?</p>
    return data?.description.html.length > 8
      ? parse(data?.description.html)
      : '';
  };

  return (
    <>
      {!isLoading && (
        <div className={s.container}>
          <Link to="/" className={s.arrow}></Link>
          <div className={s.wrapper}>
            <div className={s.image}>
              <div className={s.image__container}>
                <img src={data?.songImg} alt={`${data?.title} cover`} />
                <img
                  src={data?.songImg}
                  alt={`${data?.title} blur cover`}
                  className={s.image__background}
                />
              </div>
            </div>

            <div className={s.info}>
              <div className={s.info__header}>
                <div className={s.title}>{data?.title}</div>
                <div className={s.artist}>{data?.artist}</div>
              </div>

              <div className={s.stats}>
                <div className={s.stats__text}>
                  <span title="Release Date">
                    <ReleaseDateIcon />
                    <span>{data?.date}</span>
                  </span>
                </div>

                <div className={s.stats__text}>
                  <span title="Album Name">
                    <AlbumIcon />
                    <span>{data?.album?.name}</span>
                  </span>
                </div>

                <div className={s.stats__text}>
                  <span title="Pageviews on Genius">
                    <ViewsIcon />
                    <span>{data?.stats?.pageviews}</span>
                  </span>
                </div>

                {data?.annotationCount! > 0 && (
                  <div className={s.stats__text}>
                    <span title="Annotations on Genius">
                      <AnnotationsIcon />
                      <span>{data?.annotationCount}</span>
                    </span>
                  </div>
                )}
              </div>

              <div className={s.listen__button}>
                <PlayIcon />
                <span className={s.listen_demo}>Listen demo</span>
              </div>

              <div className={s.description}>{getSongDescription()}</div>
            </div>
          </div>
        </div>
      )}

      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default SongPage;
