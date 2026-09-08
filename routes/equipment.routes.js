const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipment.controller');

router.post('/', equipmentController.createEquipment);
router.get('/', equipmentController.getEquipments);
router.get('/:id', equipmentController.getEquipmentById);
router.put('/:id', equipmentController.updateEquipment);
router.delete('/:id', equipmentController.deleteEquipment);

module.exports = router;
