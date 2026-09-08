const MuscleGroup = require('../models/muscleGroup.model');

class MuscleGroupService {
  async create(data) {
    const muscleGroup = new MuscleGroup(data);
    return await muscleGroup.save();
  }

  async getAll() {
    return await MuscleGroup.find({}).populate('primaryMuscleGroup', 'name isPrimary');
  }

  async getById(id) {
    return await MuscleGroup.findById(id).populate('primaryMuscleGroup', 'name isPrimary');
  }

  async updateById(id, data) {
    return await MuscleGroup.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('primaryMuscleGroup', 'name isPrimary');
  }

  async deleteById(id) {
    return await MuscleGroup.findByIdAndDelete(id);
  }
}

module.exports = new MuscleGroupService();
