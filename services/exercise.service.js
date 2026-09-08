const Exercise = require('../models/exercise.model');

class ExerciseService {
  async create(data) {
    const exercise = new Exercise(data);
    return await exercise.save();
  }

  async getAll() {
    return await Exercise.find({})
      .populate('equipment', 'name tags')
      .populate('primaryMuscleGroup', 'name isPrimary')
      .populate('muscleGroups.muscleGroup', 'name isPrimary primaryMuscleGroup');
  }

  async getById(id) {
    return await Exercise.findById(id)
      .populate('equipment', 'name tags')
      .populate('primaryMuscleGroup', 'name isPrimary')
      .populate('muscleGroups.muscleGroup', 'name isPrimary primaryMuscleGroup');
  }

  async updateById(id, data) {
    return await Exercise.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate('equipment', 'name tags')
      .populate('primaryMuscleGroup', 'name isPrimary')
      .populate('muscleGroups.muscleGroup', 'name isPrimary primaryMuscleGroup');
  }

  async deleteById(id) {
    return await Exercise.findByIdAndDelete(id);
  }
}

module.exports = new ExerciseService();
