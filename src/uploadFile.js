import axios from 'axios';

async function uploadFile(file) {
    try {
        // Validate file object
        if (!file || !file.uri || !file.type || !file.name) {
            throw new Error('Invalid file object');
        }

        const formData = new FormData();
        formData.append('file', {
            uri: file.uri,
            type: file.type,
            name: file.name,
        });

        const response = await axios.post('https://your-backend-url.com/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Upload successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Upload failed:', error.message || error);
        throw error;
    }
}

export default uploadFile;
