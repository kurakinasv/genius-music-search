import { FC, FormEvent, KeyboardEvent, useCallback, useState } from 'react';

import s from './InputComponent.module.scss';

type InputComponentProps = {
  clickHandler: (value: string) => void;
  disabled: boolean;
};

const InputComponent: FC<InputComponentProps> = ({
  clickHandler,
  disabled,
}) => {
  const [value, setValue] = useState('');

  const onClick = () => {
    clickHandler(value);
    setValue('');
  };

  const onEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onClick();
  };

  const inputHandler = useCallback((event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  }, []);

  return (
    <div className={s.search}>
      <input
        type="text"
        value={value}
        onChange={inputHandler}
        onKeyUp={onEnterPress}
        placeholder="Поиск песни или исполнителя..."
        disabled={disabled}
      />
      <button onClick={onClick} disabled={disabled}>
        Найти
      </button>
    </div>
  );
};

export default InputComponent;
