'use client'
import { Header } from "@/app/components/header";
import styles from './index.module.css';
import { InputTextArea } from "@/app/components/input";
import { ChangeEvent, useState } from "react";
import sendString from "@/api/jsonParser";

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
        const csvLines = text.split( '\n' ).filter( line => line.trim() !== '' );
        const formattedText = csvLines.map( line => `"${line.trim().replace( /"/g, '' )}"` ).join( ', ' );
        setInput( formattedText );
      };
      reader.readAsText( file );
    }
  };

  const handleSubmit = () => {
    // Aquí puedes enviar el texto formateado a tu API o hacer cualquier otra acción necesaria
    console.log( 'Texto a enviar:', input );
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
        <div>
          <button onClick={() => sendString( input )}>Enviar</button>
        </div>
      </div>
    </>
  );
};
