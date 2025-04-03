const API_BASE_URL = 'http://localhost:8000/api'; // Updated to match backend URL

export async function fetchData() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`); // Example endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
