import { useContext, useEffect, useState } from 'react';

import { SongsContext } from '@app/App';
import NamedIcon from '@components/NamedIcon';
import ReturnButton from '@components/ReturnButton';
import AlbumIcon from '@icons/AlbumIcon';
import AnnotationsIcon from '@icons/AnnotationsIcon';
import PlayIcon from '@icons/PlayIcon';
import ReleaseDateIcon from '@icons/ReleaseDateIcon';
import ViewsIcon from '@icons/ViewsIcon';
import Store from '@store/Store';
import parse from 'html-react-parser';

import s from './SongPage.module.scss';

const SongPage: React.FC = () => {
  const { currentEndpoint } = useContext(SongsContext);

  const store = new Store();

  const [isLoading, setIsLoading] = useState(false);

  const [songData, setSongData] = useState(store.currentSongData);

  const getStoreSongData = async () => {
    setIsLoading(true);

    if (currentEndpoint) await store.getSongData(currentEndpoint);
    setSongData(store.currentSongData);

    setIsLoading(false);
  };

  useEffect(() => {
    getStoreSongData();
  }, []);

  const {
    description,
    title,
    songImg,
    artist,
    date,
    album,
    stats,
    annotationCount,
    apple_music_id,
    apple_music_player_url,
    media,
  } = songData;

  const [isActive, setIsActive] = useState(false);
  const changeListenBtnState = () => {
    setIsActive((v) => !v);
  };

  const renderMediaLinks = () => {
    return (
      <ul>
        {media?.map((item) => (
          <li>
            <a href={item.url} target="_blank" rel="noreferrer">
              {item.provider}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {!isLoading && (
        <div className={s.container}>
          <ReturnButton />

          <div className={s.wrapper}>
            <div className={s.image}>
              <div className={s.image__container}>
                <img src={songImg} alt={`${title} cover`} />
                <img
                  src={songImg}
                  alt={`${title} blur cover`}
                  className={s.image__background}
                />
              </div>
            </div>

            <div className={s.info}>
              <div className={s.info__header}>
                <div className={s.title}>{title}</div>
                <div className={s.artist}>{artist}</div>
              </div>

              <div className={s.stats}>
                {date && (
                  <NamedIcon
                    children={<ReleaseDateIcon />}
                    name={date}
                    title="Release Date"
                  />
                )}

                {album?.name && (
                  <NamedIcon
                    children={<AlbumIcon />}
                    name={album.name}
                    title="Album Name"
                  />
                )}

                {stats?.pageviews && (
                  <NamedIcon
                    children={<ViewsIcon />}
                    name={String(stats.pageviews)}
                    title="Pageviews on Genius"
                  />
                )}

                {!!annotationCount && (
                  <NamedIcon
                    children={<AnnotationsIcon />}
                    name={String(annotationCount)}
                    title="Annotations on Genius"
                  />
                )}
              </div>

              {apple_music_id && (
                <div
                  className={s.listen__button}
                  onClick={changeListenBtnState}
                >
                  <PlayIcon isPressed={isActive} />
                  <span className={s.listen_demo}>Послушать</span>
                </div>
              )}

              {isActive && (
                <>
                  <div className={s.media}>Слушать демо</div>
                  <iframe
                    src={apple_music_player_url}
                    title={title}
                    className={s.player}
                  />
                  <div className={s.media}>
                    Слушать полностью {media && renderMediaLinks()}
                  </div>
                </>
              )}

              {!apple_music_id && !!media?.length && (
                <div className={s.media}>
                  Послушать на {media && renderMediaLinks()}
                </div>
              )}

              <div className={s.description}>
                {description.html.length > 8 ? parse(description.html) : ''}
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default SongPage;
