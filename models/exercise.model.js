const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Exercise name is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    primaryMuscleGroup: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MuscleGroup',
        },
      ],
      validate: [
        function (val) {
          return val.length <= 2;
        },
        'Exercise can have at most 2 primary muscle groups',
      ],
      default: [],
    },
    muscleGroups: [
      {
        muscleGroup: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MuscleGroup',
          required: true,
        },
        value: {
          type: Number,
          default: 1,
          min: 0,
          max: 1,
        },
      },
    ],
    equipment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Exercise', exerciseSchema);