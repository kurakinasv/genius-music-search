import React, { FC, ReactNode } from 'react';

import s from './NamedIcon.module.scss';

type NamedIconProps = {
  children: ReactNode;
  name: string;
  title: string;
};

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
