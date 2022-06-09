import { FunctionComponent } from 'react';

import { Link } from 'react-router-dom';

import s from './ReturnButton.module.scss';

const ReturnButton: FunctionComponent = () => {
  return <Link to="/" className={s.arrow} />;
};

export default ReturnButton;
