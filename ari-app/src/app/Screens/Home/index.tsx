'use client';
import { Header } from "@/app/components/header";
import styles from './index.module.css';
import { InputTextArea } from "@/app/components/input";
import { UploadFileComponent } from "@/app/components/UploadFile/UploadFileComponent";
import { ChangeEvent, useState } from "react";
import sendString from "@/api/jsonParser";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export const Home = () => {
  const [input, setInput] = useState<string>('');
  const [jsonResult, setJsonResult] = useState<string | null>(null);

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

  const handleSubmit = async () => {
    try {
      const result = await sendString(input);
      setJsonResult(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDownload = () => {
    if (jsonResult) {
      const blob = new Blob([jsonResult], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'result.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleCopy = () => {
    if (jsonResult) {
      navigator.clipboard.writeText(jsonResult).then(() => {
        toastr.success("Texto copiado al portapapeles");
      }, (err) => {
        toastr.error('Error al copiar al portapapeles: ', err);
      });
    }
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
          <button onClick={handleSubmit} className={styles.sendBtn}>Enviar</button>
        </div>
        {jsonResult && (
          <div className={styles.resultContainer}>
            <pre>{jsonResult}</pre>
            <div className={styles.buttonContainer}>
              <button onClick={handleDownload} className={styles.downloadBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="15" height="15" fill="white">
                  <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                </svg>
              </button>
              <button onClick={handleCopy} className={styles.downloadBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="15" height="15" fill="white"><path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
