const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');

// Connect to MongoDB
connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});