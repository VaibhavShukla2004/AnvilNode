
import equipmentService from "../services/equipment.service.js";

export async function createEquipment(req, res) {
  try {
    const equipment = await equipmentService.create(req.body);
    return res.status(201).json({ success: true, data: equipment });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

export async function getEquipments(req, res) {
  try {
    const equipments = await equipmentService.getAll();
    return res.status(200).json({
      success: true,
      count: equipments.length,
      data: equipments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export async function getEquipmentById(req, res) {
  try {
    const equipment = await equipmentService.getById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ success: false, error: "Equipment not found" });
    }

    return res.status(200).json({ success: true, data: equipment });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

export async function updateEquipment(req, res) {
  try {
    const equipment = await equipmentService.updateById(req.params.id, req.body);

    if (!equipment) {
      return res.status(404).json({ success: false, error: "Equipment not found" });
    }

    return res.status(200).json({ success: true, data: equipment });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}

export async function deleteEquipment(req, res) {
  try {
    const equipment = await equipmentService.deleteById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ success: false, error: "Equipment not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Equipment deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
}
