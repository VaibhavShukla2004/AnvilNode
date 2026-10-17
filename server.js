
import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/db.js";

import equipmentRoutes from "./routes/equipment.routes.js";
import muscleGroupRoutes from "./routes/muscleGroup.routes.js";
import exerciseRoutes from "./routes/exercise.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/equipments", equipmentRoutes);
app.use("/api/muscle-groups", muscleGroupRoutes);
app.use("/api/exercises", exerciseRoutes);

app.get("/", (req, res) => {
  res.json({ message: "AnvilNode API Server is running" });
});

async function startServer() {
  try {
    await db.query("SELECT 1");
    console.log("PostgreSQL connection established.");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to PostgreSQL:", error);
    process.exitCode = 1;
  }
}

startServer();
