const mongoose = require('mongoose');
const muscleGroups = require('../constants/muscleGroups');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    primaryMuscleGroup: {
        type: String,
        enum: Object.values(muscleGroups.primaryMuscleGroups),
    },
    fatigue: [
        {
            muscleGroup: {
                type: String,
                enum: Object.values(muscleGroups.muscleGroups),
                required: true
            },
            value: {
                type: Number,
                required: true,
                min: 0,
                max: 1
            }
        }
    ],
    
});