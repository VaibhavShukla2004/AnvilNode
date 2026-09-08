const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Equipment name is required'],
      unique: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        enum: {
          values: ['gym', 'home', 'park'],
          message: '{VALUE} is not a valid equipment tag (allowed: gym, home, park)',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Equipment', equipmentSchema);
