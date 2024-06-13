import React, { ChangeEvent } from 'react';
import styles from './input.module.css';

interface IInputTextAreaProps {
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputTextArea: React.FC<IInputTextAreaProps> = ({ value, placeholder = 'Ingrese el texto o adjunte su archivo', onChange }) => {
  return (
    <textarea
      className={`input ${styles.input}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
