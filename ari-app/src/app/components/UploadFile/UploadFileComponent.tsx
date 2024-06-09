import React, { useState } from 'react';
import "./uploadFile.css";

interface UploadFileComponentProps {
    onFileSelect: (file: File) => void;
}

export const UploadFileComponent: React.FC<UploadFileComponentProps> = ({ onFileSelect }) => {
    const [fileName, setFileName] = useState<string>('No hay archivo seleccionado');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setSelectedFile(file);
        } else {
            setFileName('No hay archivo seleccionado');
            setSelectedFile(null);
        }
    };

    const handleReset = () => {
        setFileName('No hay archivo seleccionado');
        setSelectedFile(null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedFile) {
            onFileSelect(selectedFile);
        }
    };

    return (
        <form className="dropzone-box" onSubmit={handleSubmit}>
            <h2>Carga y adjunta el archivo</h2>
            <p>Haz clic para cargar o arrastre y suelte</p>
            <div className="dropzone-area">
                <div className="file-upload-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-cloud-upload" width="24"
                        height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                        <path d="M9 15l3 -3l3 3" />
                        <path d="M12 12l0 9" />
                    </svg>
                </div>
                <input type="file" accept=".csv" required id="upload-file" name="uploaded-file" onChange={handleFileChange} />
                <p className="file-info">{fileName}</p>
            </div>
            <div className="dropzone-actions">
                <button type="reset" onClick={handleReset}>
                    Borrar
                </button>
                <button id="submit-button" type="submit">
                    Generar
                </button>
            </div>
        </form>
    );
};
