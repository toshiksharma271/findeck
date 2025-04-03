const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
}));
app.use(express.json());

// Example API endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
