import { FC, useCallback, useEffect, useState } from 'react';

import OnTopArrow from '@icons/OnTopArrow';

import s from './ScrollOnTopButton.module.scss';

const ScrollOnTopButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const clickHandler = useCallback(() => {
    document.documentElement.scrollTo(0, 0);
  }, []);

  const scrollHandler = () => {
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop > clientHeight / 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div
      className={`${isVisible ? `${s.scrollBtn}` : `${s.scrollBtn__hidden}`}`}
      onClick={clickHandler}
    >
      <OnTopArrow />
    </div>
  );
};

export default ScrollOnTopButton;
