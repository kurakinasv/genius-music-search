import { useContext, useState } from 'react';

import { SongsContext } from '@app/App';
import FollowersIcon from '@app/icons/FollowersIcon';
import FacebookIcon from '@icons/FacebookIcon';
import InstIcon from '@icons/InstIcon';
import { RequestTypes, store } from '@store/store';
import { ArtistPageType } from '@type/types';
import parse from 'html-react-parser';
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
      // setIsLoading(false);
    } catch (error: any) {
      console.log('error in songPage:', error.message);
    }
  };

  let htmlData: any;
  getArtistData()
    .then(() => (htmlData = parse(data?.description.html)))
    // .then(() => (data!.description = htmlData[0].props.children))
    .then(() => console.log(htmlData))
    .then(() => setIsLoading(false));

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
                <div className={s.stats__text}>
                  {data?.facebook_name && (
                    <FacebookIcon name={data?.facebook_name} />
                  )}

                  {data?.instagram_name && (
                    <InstIcon name={data?.instagram_name} />
                  )}

                  {data?.followers_count && (
                    <FollowersIcon number={data?.followers_count} />
                  )}
                </div>
              </div>
              <div className={s.description}>
                {parse(data?.description.html)}
              </div>
              <div className={s.description__gradient}></div>
            </div>
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default ArtistPage;
