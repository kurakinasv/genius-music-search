import { memo, useContext } from 'react';

import { SongsContext } from '@app/App';
import Store from '@store/Store';
import { ArtistType } from '@type/types';
import { useNavigate } from 'react-router-dom';

import s from './ArtistCard.module.scss';

const ArtistCard: React.FC<{ artistInfo: ArtistType }> = ({ artistInfo }) => {
  const navigate = useNavigate();

  const context = useContext(SongsContext);

  const store = new Store();

  const { id, name } = artistInfo;

  const clickHandler = () => {
    navigate(`/artist/${id}`);

    context.currentEndpoint = id;
    store.setCurrentId(id);
  };

  return (
    <>
      <div
        className={s.item}
        style={{
          backgroundImage: `url(${artistInfo.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light',
        }}
      >
        <div className={s.content}>
          <div className={s.title}>
            <span>{name}</span>
          </div>
        </div>

        <div className={s.link} onClick={clickHandler}>
          <span>Перейти к исполнителю</span>
        </div>
      </div>
    </>
  );
};

export default memo(ArtistCard);
