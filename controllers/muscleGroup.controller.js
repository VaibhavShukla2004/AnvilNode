
import muscleGroupService from "../services/muscleGroup.service.js";

export async function createMuscleGroup(req, res) {
  try {
    const muscleGroup = await muscleGroupService.create(req.body);
    return res.status(201).json({ success: true, data: muscleGroup });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

export async function getMuscleGroups(req, res) {
  try {
    const muscleGroups = await muscleGroupService.getAll();

    return res.status(200).json({
      success: true,
      count: muscleGroups.length,
      data: muscleGroups,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export async function getMuscleGroupById(req, res) {
  try {
    const muscleGroup = await muscleGroupService.getById(req.params.id);

    if (!muscleGroup) {
      return res.status(404).json({
        success: false,
        error: "Muscle group not found",
      });
    }

    return res.status(200).json({ success: true, data: muscleGroup });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

export async function updateMuscleGroup(req, res) {
  try {
    const muscleGroup = await muscleGroupService.updateById(
      req.params.id,
      req.body
    );

    if (!muscleGroup) {
      return res.status(404).json({
        success: false,
        error: "Muscle group not found",
      });
    }

    return res.status(200).json({ success: true, data: muscleGroup });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

export async function deleteMuscleGroup(req, res) {
  try {
    const muscleGroup = await muscleGroupService.deleteById(req.params.id);

    if (!muscleGroup) {
      return res.status(404).json({
        success: false,
        error: "Muscle group not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Muscle group deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
