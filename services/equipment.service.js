const Equipment = require('../models/equipment.model');

class EquipmentService {
  async create(data) {
    const equipment = new Equipment(data);
    return await equipment.save();
  }

  async getAll() {
    return await Equipment.find({});
  }

  async getById(id) {
    return await Equipment.findById(id);
  }

  async updateById(id, data) {
    return await Equipment.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return await Equipment.findByIdAndDelete(id);
  }
}

module.exports = new EquipmentService();
