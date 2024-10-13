const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors package

// Initialize dotenv to use environment variables from .env file
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming requests with JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors()); // Add this line to enable CORS

// Import routes
const entryRoutes = require('./routes/entryRoutes');
app.use('/api/entries', entryRoutes);

// Set up the server to listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
