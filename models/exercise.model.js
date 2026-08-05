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

});