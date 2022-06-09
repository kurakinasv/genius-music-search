import { FunctionComponent } from 'react';

import { colors } from '@styles/colors';

import s from './Icons.module.scss';

const PlayIcon: FunctionComponent<{ color?: string }> = ({
  color = colors.lightBlue,
}) => {
  return (
    <svg
      width="39"
      height="53"
      viewBox="0 0 39 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={s.playicon}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.1968 26.1778L5.99998 8.84462L5.99998 43.511L30.1968 26.1778ZM37.0954 28.6167C38.766 27.4199 38.766 24.9357 37.0954 23.739L4.74701 0.566471C2.76182 -0.855605 -1.90981e-05 0.563312 -1.92049e-05 3.0053L-2.12307e-05 49.3503C-2.13374e-05 51.7923 2.76182 53.2112 4.74701 51.7892L37.0954 28.6167Z"
        fill={color}
      />
    </svg>
  );
};

export default PlayIcon;
