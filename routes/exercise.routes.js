const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exercise.controller');

router.post('/', exerciseController.createExercise);
router.get('/', exerciseController.getExercises);
router.get('/:id', exerciseController.getExerciseById);
router.put('/:id', exerciseController.updateExercise);
router.delete('/:id', exerciseController.deleteExercise);

module.exports = router;
