import React, { useState } from 'react';
import { fetchData } from './services/apiService';

function App() {
    const [data, setData] = useState(null);
    const [image, setImage] = useState(null);

    const handleCapturePhoto = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('http://localhost:8000/api/input/upload-image/', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    return (
        <div>
            <h1>Findeck Frontend</h1>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCapturePhoto}
            />
            {data ? (
                <div>
                    <p>Uploaded File: {data.filename}</p>
                    <p>Source Type: {data.source_type}</p>
                </div>
            ) : (
                <p>Upload an image to process</p>
            )}
        </div>
    );
}

export default App;
