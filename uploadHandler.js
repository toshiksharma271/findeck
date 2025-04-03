import axios from 'axios';

async function uploadDocument(file) {
    try {
        const formData = new FormData();
        formData.append('file', {
            uri: decodeURIComponent(file.uri), // Decode URI
            name: file.name,
            type: file.type,
        });

        const response = await axios.post('https://your-backend-endpoint.com/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer YOUR_TOKEN', // Add token if required
            },
        });

        console.log('Upload successful:', response.data);
    } catch (error) {
        console.error('Upload failed:', error.message);
        if (error.response) {
            console.error('Server response:', error.response.data);
        }
    }
}

export default uploadDocument;
