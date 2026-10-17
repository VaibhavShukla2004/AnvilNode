import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import setup from './config/db.js';


// const equipmentRoutes = require('./routes/equipment.routes');
// const muscleGroupRoutes = require('./routes/muscleGroup.routes');
// const exerciseRoutes = require('./routes/exercise.routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/equipments', equipmentRoutes);
// app.use('/api/muscle-groups', muscleGroupRoutes);
// app.use('/api/exercises', exerciseRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({ message: 'AnvilNode API Server is running' });
});

async function startServer() {
  try {
    await setup();
  } catch (error) {
    console.error('Failed to initialize Neon database:', error);
    process.exitCode = 1;
    return;
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();