'use client'
import { Header } from "@/app/components/header";
import styles from './index.module.css';
import { InputTextArea } from "@/app/components/input";
import { ChangeEvent, useState } from "react";

export const Home = () => {
  const [input, setInput] = useState<string>( '' );

  const handleChange = ( event: ChangeEvent<HTMLTextAreaElement> ) => {
    setInput( event.target.value );
  };

  const handleFileUpload = ( event: ChangeEvent<HTMLInputElement> ) => {
    const file = event.target.files?.[0];
    if ( file ) {
      const reader = new FileReader();
      reader.onload = ( e ) => {
        const text = e.target?.result as string;
        setInput( text );
      };
      reader.readAsText( file );
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
        <div className={styles.textAreaContainer}>
          <InputTextArea value={input} onChange={handleChange} />
        </div>
      </div>
    </>
  );
}
