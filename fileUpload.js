import { Platform } from 'react-native';

async function uploadFile(fileUri) {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: 'document.jpeg',
      type: 'image/jpeg',
    });

    const response = await fetch('https://your-backend-url.com/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Upload successful:', result);
  } catch (error) {
    console.error('Upload failed:', error.message);
  }
}

// Example usage
const fileUri = Platform.OS === 'android'
  ? 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fsmartbi-33815e25-24a2-40ae-8a5e-540fe2fbae60/ImagePicker/93ab6436-34df-4acc-bc96-a1f0b198e5f8.jpeg'
  : 'file://path/to/your/file.jpeg';

uploadFile(fileUri);
