import React, { useState } from 'react';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8080/api/files/upload', {
                method: 'POST',
                headers: {
                    // If authentication is needed, uncomment the next line and add your token
                    // 'Authorization': `Bearer your_token_here`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.text(); // or response.json() if your API returns JSON
                setMessage(`File uploaded successfully: ${data}`);
            } else {
                const errorText = await response.text();
                setMessage(`Error uploading file: ${errorText}`);
            }
        } catch (error) {
            setMessage(`Error: ${(error as Error).message}`);
        }
    };

    return (
        <div>
            <h1>File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;


