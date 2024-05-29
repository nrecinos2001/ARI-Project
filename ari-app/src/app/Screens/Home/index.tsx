import { Header } from "@/app/components/header"
import styles from './index.module.css';
import { InputTextArea } from "@/app/components/input";
import { useState } from "react";

export const Home = () => {
  const [input, setInput] = useState<string>('')
  return (
    <>
      <Header />
      <div className={styles.textAreaContainer}>
        <div>
          <InputTextArea text={input} />
        </div>
      </div>
    </>
  )
}