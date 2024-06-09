'use client';
import { Header } from "@/app/components/header";
import styles from './index.module.css';
import { InputTextArea } from "@/app/components/input";
import { UploadFileComponent } from "@/app/components/UploadFile/UploadFileComponent";
import { ChangeEvent, useState } from "react";
import sendString from "@/api/jsonParser";

export const Home = () => {
  const [input, setInput] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const csvLines = text.split('\n').filter(line => line.trim() !== '');
      const formattedText = csvLines.map(line => `"${line.trim().replace(/"/g, '')}"`).join(', ');
      setInput(formattedText);
    };
    reader.readAsText(file);
  };

  return (
    <>
      <div className={styles.headerAndUpload}>
        <Header />
        <UploadFileComponent onFileSelect={handleFileSelect} />
      </div>
      <div className={styles.container}>
        <div className={styles.textAreaContainer}>
          <InputTextArea value={input} onChange={handleChange} />
        </div>
        <div>
          <button onClick={() => sendString(input)}>Enviar</button>
        </div>
      </div>
    </>
  );
};
