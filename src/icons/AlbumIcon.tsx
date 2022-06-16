import { FunctionComponent } from 'react';

import { colors } from '@styles/colors';

import s from './Icons.module.scss';

const AlbumIcon: FunctionComponent<{ color?: string }> = ({
  color = colors.lapisBlue,
}) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={s.icon}
    >
      <path
        d="M2.5 21.75V3.25C2.5 2.83579 2.83579 2.5 3.25 2.5H21.75C22.1642 2.5 22.5 2.83579 22.5 3.25V21.75C22.5 22.1642 22.1642 22.5 21.75 22.5H3.25C2.83579 22.5 2.5 22.1642 2.5 21.75Z"
        stroke={color}
        strokeWidth="1.7"
      />
      <path
        d="M10 27.5H26.75C27.1642 27.5 27.5 27.1642 27.5 26.75V10"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M13.75 15.625C13.75 16.6605 12.9105 17.5 11.875 17.5C10.8395 17.5 10 16.6605 10 15.625C10 14.5895 10.8395 13.75 11.875 13.75C12.9105 13.75 13.75 14.5895 13.75 15.625Z"
        fill={color}
      />
      <path
        d="M13.75 15.625V8.25C13.75 7.83579 14.0858 7.5 14.5 7.5H16.25M13.75 15.625C13.75 16.6605 12.9105 17.5 11.875 17.5C10.8395 17.5 10 16.6605 10 15.625C10 14.5895 10.8395 13.75 11.875 13.75C12.9105 13.75 13.75 14.5895 13.75 15.625Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AlbumIcon;
