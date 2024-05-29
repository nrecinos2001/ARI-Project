import styles from './input.module.css';

interface IInputTextAreaProps {
  text: string;
}

export const InputTextArea = ({text}: IInputTextAreaProps) => {
  return (
    <textarea className={styles.input} placeholder='Ingrese su texto' value={text}/>
  )
}