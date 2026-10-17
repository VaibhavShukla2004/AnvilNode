
import express from "express";

import {
  createMuscleGroup,
  getMuscleGroups,
  getMuscleGroupById,
  updateMuscleGroup,
  deleteMuscleGroup,
} from "../controllers/muscleGroup.controller.js";

const router = express.Router();

router.post("/", createMuscleGroup);
router.get("/", getMuscleGroups);
router.get("/:id", getMuscleGroupById);
router.put("/:id", updateMuscleGroup);
router.delete("/:id", deleteMuscleGroup);

export default router;
