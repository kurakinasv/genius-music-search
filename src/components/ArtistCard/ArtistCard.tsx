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
      <div className={s.item}>
        <div className={s.content}>
          <div className={s.title}>{name}</div>
        </div>

        <div className={s.link} onClick={clickHandler}>
          Перейти к исполнителю
        </div>
      </div>
    </>
  );
};

export default memo(ArtistCard);
