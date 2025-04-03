import React, { useState } from 'react';
import axios from 'axios';

const PictureUploader = () => {
    const [picture, setPicture] = useState(null);

    const handlePictureClick = async () => {
        if (!picture) {
            alert("No picture selected!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('picture', picture);

            const response = await axios.post('https://your-backend-api.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Picture uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading picture:', error);
        }
    };

    const handleFileChange = (event) => {
        setPicture(event.target.files[0]);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handlePictureClick}>Upload Picture</button>
        </div>
    );
};

export default PictureUploader;
