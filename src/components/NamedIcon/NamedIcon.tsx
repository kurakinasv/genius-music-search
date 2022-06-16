import React, { FC, PropsWithChildren } from 'react';

import s from './NamedIcon.module.scss';

type NamedIconProps = PropsWithChildren<{
  name: string;
  title: string;
}>;

const NamedIcon: FC<NamedIconProps> = ({ children, name, title }) => {
  return (
    <div className={s.info}>
      <span title={title}>
        {children}
        <span>{name}</span>
      </span>
    </div>
  );
};

export default NamedIcon;
