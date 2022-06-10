import { useContext, useEffect, useState } from 'react';

import { SongsContext } from '@app/App';
import NamedIcon from '@components/NamedIcon';
import ReturnButton from '@components/ReturnButton';
import FacebookIcon from '@icons/FacebookIcon';
import FollowersIcon from '@icons/FollowersIcon';
import InstIcon from '@icons/InstIcon';
import Store from '@store/Store';
import parse from 'html-react-parser';

import s from './ArtistPage.module.scss';

const ArtistPage: React.FC = () => {
  const { currentEndpoint } = useContext(SongsContext);

  const store = new Store();

  const [isLoading, setIsLoading] = useState(false);

  const [artistData, setArtistData] = useState(store.currentArtistData);

  const getStoreArtistData = async () => {
    setIsLoading(true);

    if (currentEndpoint) await store.getArtistData(currentEndpoint);
    setArtistData(store.currentArtistData);

    setIsLoading(false);
  };

  useEffect(() => {
    getStoreArtistData();
  }, []);

  const {
    name,
    image_url,
    facebook_name,
    instagram_name,
    followers_count,
    description,
  } = artistData;

  return (
    <>
      {!isLoading && (
        <div className={s.container}>
          <ReturnButton />

          <div className={s.wrapper}>
            <div className={s.image}>
              <img src={image_url} alt={name} />
            </div>

            <div className={s.info}>
              <div className={s.title}>{name}</div>
              <div className={s.stats}>
                {facebook_name && (
                  <NamedIcon
                    children={<FacebookIcon />}
                    name={facebook_name}
                    title="Facebook"
                  />
                )}

                {instagram_name && (
                  <NamedIcon
                    children={<InstIcon />}
                    name={instagram_name}
                    title="Instagram"
                  />
                )}

                {followers_count && (
                  <NamedIcon
                    children={<FollowersIcon />}
                    name={String(followers_count)}
                    title="Followers on Genius"
                  />
                )}
              </div>

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

export default ArtistPage;
