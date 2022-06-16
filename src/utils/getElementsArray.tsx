import { ReactNode } from 'react';

export const getElementsArray = (element: ReactNode, amount: number) => {
  const array = [];

  for (let i = 0; i < amount; i++) {
    array.push(<>{element}</>);
  }

  return array;
};
