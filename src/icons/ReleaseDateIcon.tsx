import { FunctionComponent } from 'react';

import { colors } from '@styles/colors';

import s from './Icons.module.scss';

const ReleaseDateIcon: FunctionComponent<{ color?: string }> = ({
  color = colors.lapisBlue,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      className={s.icon}
    >
      <path d="M0 0h20v20H0V0zm10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-5a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
};

export default ReleaseDateIcon;
