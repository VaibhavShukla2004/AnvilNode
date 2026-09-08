const exerciseService = require('../services/exercise.service');

exports.createExercise = async (req, res) => {
  try {
    const exercise = await exerciseService.create(req.body);
    return res.status(201).json({ success: true, data: exercise });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

exports.getExercises = async (req, res) => {
  try {
    const exercises = await exerciseService.getAll();
    return res.status(200).json({ success: true, count: exercises.length, data: exercises });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await exerciseService.getById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ success: false, error: 'Exercise not found' });
    }
    return res.status(200).json({ success: true, data: exercise });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateExercise = async (req, res) => {
  try {
    const exercise = await exerciseService.updateById(req.params.id, req.body);
    if (!exercise) {
      return res.status(404).json({ success: false, error: 'Exercise not found' });
    }
    return res.status(200).json({ success: true, data: exercise });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await exerciseService.deleteById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ success: false, error: 'Exercise not found' });
    }
    return res.status(200).json({ success: true, message: 'Exercise deleted successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};
