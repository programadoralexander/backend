// registroPerinatal.controller.js
const db = require("../models");
const RegistroPerinatal = db.registroPerinatal;

exports.createRegistroPerinatal = async (req, res) => {
  try {
    const { /* otros campos */ } = req.body;

    const registroPerinatal = new RegistroPerinatal({
      createdBy: req.userId, // El ID del usuario que creó el registro
      /* otros campos */
    });

    await registroPerinatal.save();

    return res.status(201).json({ message: "Registro perinatal creado exitosamente." });
  } catch (error) {
    console.error("Error al crear registro perinatal:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};


exports.getAllRegistrosPerinatales = async (req, res) => {
    try {
      const registrosPerinatales = await RegistroPerinatal.find();
      return res.status(200).json(registrosPerinatales);
    } catch (error) {
      console.error("Error al obtener todos los registros perinatales:", error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  };

exports.getRegistroPerinatalById = async (req, res) => {
  try {
    const registroPerinatalId = req.params.registroPerinatalId;
    const registroPerinatal = await RegistroPerinatal.findById(registroPerinatalId);

    if (!registroPerinatal) {
      return res.status(404).json({ message: "Registro perinatal no encontrado." });
    }

    return res.status(200).json(registroPerinatal);
  } catch (error) {
    console.error("Error al obtener registro perinatal por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};



exports.updateRegistroPerinatal = async (req, res) => {
  try {
    const registroPerinatalId = req.params.registroPerinatalId;
    const { /* otros campos */ } = req.body;

    const registroPerinatal = await RegistroPerinatal.findById(registroPerinatalId);

    if (!registroPerinatal) {
      return res.status(404).json({ message: "Registro perinatal no encontrado." });
    }


    await registroPerinatal.save();

    return res.status(200).json({ message: "Registro perinatal actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar registro perinatal:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteRegistroPerinatal = async (req, res) => {
  try {
    const registroPerinatalId = req.params.registroPerinatalId;
    const registroPerinatal = await RegistroPerinatal.findById(registroPerinatalId);

    if (!registroPerinatal) {
      return res.status(404).json({ message: "Registro perinatal no encontrado." });
    }


    await registroPerinatal.remove();

    return res.status(200).json({ message: "Registro perinatal eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar registro perinatal:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.createRegistroPerinatalForBrigada = async (req, res) => {
  try {
    const { /* otros campos */ } = req.body;

    const registroPerinatal = new RegistroPerinatal({
      createdBy: req.userId, // El ID del usuario que creó el registro
      /* otros campos */
    });

    await registroPerinatal.save();

    return res.status(201).json({ message: "Registro perinatal creado exitosamente." });
  } catch (error) {
    console.error("Error al crear registro perinatal:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllRegistrosPerinatalesForBrigada = async (req, res) => {
  try {
    const registrosPerinatales = await RegistroPerinatal.find({ createdBy: req.userId });

    return res.status(200).json(registrosPerinatales);
  } catch (error) {
    console.error("Error al obtener todos los registros perinatales para brigada:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getRegistroPerinatalByIdForBrigada = async (req, res) => {
  try {
    const registroPerinatalId = req.params.registroPerinatalId;
    const registroPerinatal = await RegistroPerinatal.findOne({
      _id: registroPerinatalId,
      createdBy: req.userId,
    });

    if (!registroPerinatal) {
      return res.status(404).json({ message: "Registro perinatal no encontrado." });
    }

    return res.status(200).json(registroPerinatal);
  } catch (error) {
    console.error("Error al obtener registro perinatal por ID para brigada:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateRegistroPerinatalForBrigada = async (req, res) => {
  try {
    const registroPerinatalId = req.params.registroPerinatalId;
    const { /* otros campos */ } = req.body;

    const registroPerinatal = await RegistroPerinatal.findOne({
      _id: registroPerinatalId,
      createdBy: req.userId,
    });

    if (!registroPerinatal) {
      return res.status(404).json({ message: "Registro perinatal no encontrado." });
    }

    // Actualiza los campos necesarios

    await registroPerinatal.save();

    return res.status(200).json({ message: "Registro perinatal actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar registro perinatal para brigada:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteRegistroPerinatalForBrigada = async (req, res) => {
  try {
    const registroPerinatalId = req.params.registroPerinatalId;
    const registroPerinatal = await RegistroPerinatal.findOne({
      _id: registroPerinatalId,
      createdBy: req.userId,
    });

    if (!registroPerinatal) {
      return res.status(404).json({ message: "Registro perinatal no encontrado." });
    }

    await registroPerinatal.remove();

    return res.status(200).json({ message: "Registro perinatal eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar registro perinatal para brigada:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
  
