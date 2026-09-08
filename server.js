const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');

const equipmentRoutes = require('./routes/equipment.routes');
const muscleGroupRoutes = require('./routes/muscleGroup.routes');
const exerciseRoutes = require('./routes/exercise.routes');

// Connect to MongoDB
connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/equipments', equipmentRoutes);
app.use('/api/muscle-groups', muscleGroupRoutes);
app.use('/api/exercises', exerciseRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({ message: 'AnvilNode API Server is running' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});