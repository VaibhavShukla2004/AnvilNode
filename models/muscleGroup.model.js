const mongoose = require('mongoose');

const muscleGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Muscle group name is required'],
      unique: true,
      trim: true,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    primaryMuscleGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MuscleGroup',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MuscleGroup', muscleGroupSchema);
