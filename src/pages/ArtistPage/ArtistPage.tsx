import { useContext, useEffect } from 'react';

import { musicContext } from '@app/App';
import NamedIcon from '@components/NamedIcon';
import ReturnButton from '@components/ReturnButton';
import FacebookIcon from '@icons/FacebookIcon';
import FollowersIcon from '@icons/FollowersIcon';
import InstIcon from '@icons/InstIcon';
import useMusicStore from '@store/useMusicStore';
import parse from 'html-react-parser';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import s from './ArtistPage.module.scss';
import ArtistPageLoader from './ArtistPageLoader';

const ArtistPage: React.FC = () => {
  const { currentEndpoint } = useContext(musicContext);

  const navigate = useNavigate();

  const musicStore = useMusicStore();

  useEffect(() => {
    if (currentEndpoint) musicStore.getArtistData(currentEndpoint);
    else navigate('/');
  }, []);

  const {
    name,
    image_url,
    facebook_name,
    instagram_name,
    followers_count,
    description,
  } = musicStore.currentArtistData;

  return (
    <>
      <ReturnButton />

      <div className={s.container}>
        <div className={s.wrapper}>
          {musicStore.isLoading && <ArtistPageLoader />}

          {!musicStore.isLoading && (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default observer(ArtistPage);
