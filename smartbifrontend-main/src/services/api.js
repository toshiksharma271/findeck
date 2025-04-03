import Constants from 'expo-constants';
import { Platform } from 'react-native';

let API_URL;

if (__DEV__) {
    const debuggerHost = Constants.manifest?.debuggerHost || Constants.expoConfig?.hostUri;
    if (debuggerHost) {
        API_URL = `http://${debuggerHost.split(':')[0]}:8000`;
    } else {
        API_URL = 'http://192.168.1.100:8000';  // Fallback IP (change if needed)
    }
} else {
    API_URL = 'https://your-production-server.com'; // Use your actual backend URL in production
}

console.log('API_URL:', API_URL);

export const uploadDocument = async (imageUri) => {
    try {
        if (!imageUri) throw new Error("No image selected.");

        const fileExtension = imageUri.split('.').pop().toLowerCase();
        const formData = new FormData();

        formData.append('image', {  
            uri: imageUri,
            name: `document.${fileExtension}`,
            type: `image/${fileExtension}`,
        });

        const uploadResponse = await fetch(`${API_URL}/api/input/upload-image/`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            throw new Error(`Upload failed: ${uploadResponse.status} ${errorText}`);
        }

        const data = await uploadResponse.json();
        console.log('Upload successful:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
    }
};

export const analyzeDocument = async (documentId) => {
    try {
        const response = await fetch(`${API_URL}/api/analyze/${documentId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to analyze document: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        return {
            success: true,
            data: data.data
        };
    } catch (error) {
        console.error('Analysis error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};
