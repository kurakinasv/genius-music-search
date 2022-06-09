import { useContext, useEffect, useState } from 'react';

import { SongsContext } from '@app/App';
import NamedIcon from '@components/NamedIcon';
import ReturnButton from '@components/ReturnButton';
import FacebookIcon from '@icons/FacebookIcon';
import FollowersIcon from '@icons/FollowersIcon';
import InstIcon from '@icons/InstIcon';
import { RequestTypes, store } from '@store/store';
import parse from 'html-react-parser';

import s from './ArtistPage.module.scss';

const ArtistPage: React.FC = () => {
  const artistContext = useContext(SongsContext);
  // const state = artistContext.state.filter(
  //   (song) => song.id === artistContext.current
  // )[0];

  const current = `${artistContext.current}`;
  const data = store.currentData;

  const [isLoading, setIsLoading] = useState(true);

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
        description,
      } = res;

      store.currentData = {
        id,
        name,
        image_url,
        facebook_name,
        instagram_name,
        followers_count,
        description,
      };

      setIsLoading(false);
    } catch (error: any) {
      console.log('error in ArtistPage:', error.message);
    }
  };

  useEffect(() => {
    getArtistData();
  }, []);

  const getArtistDescription = () => {
    // 8 - check for <p>?</p>
    return data?.description.html.length > 8
      ? parse(data?.description.html)
      : '';
  };

  return (
    <>
      {!isLoading && (
        <div className={s.container}>
          <ReturnButton />

          <div className={s.wrapper}>
            <div className={s.image}>
              <img src={data?.image_url} alt={data?.name} />
            </div>

            <div className={s.info}>
              <div className={s.title}>{data?.name}</div>
              <div className={s.stats}>
                {data?.facebook_name && (
                  <NamedIcon
                    children={<FacebookIcon />}
                    name={data?.facebook_name}
                    title="Facebook"
                  />
                )}

                {data?.instagram_name && (
                  <NamedIcon
                    children={<InstIcon />}
                    name={data?.instagram_name}
                    title="Instagram"
                  />
                )}

                {data?.followers_count && (
                  <NamedIcon
                    children={<FollowersIcon />}
                    name={String(data?.followers_count)}
                    title="Followers on Genius"
                  />
                )}
              </div>

              <div className={s.description}>{getArtistDescription()}</div>
            </div>
          </div>
        </div>
      )}

      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default ArtistPage;
