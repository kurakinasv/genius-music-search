import { useCallback, useContext } from 'react';

import { musicContext } from '@app/App';
import { ArtistType } from '@type/types';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import s from './ArtistCard.module.scss';

const ArtistCard: React.FC<{ artistInfo: ArtistType }> = ({ artistInfo }) => {
  const navigate = useNavigate();

  const context = useContext(musicContext);

  const { id, name } = artistInfo;

  const clickHandler = useCallback(() => {
    navigate(`/artist/${id}`);

    context.currentEndpoint = id;
  }, [id]);

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

export default observer(ArtistCard);
