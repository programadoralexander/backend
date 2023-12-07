const db = require("../models");
const ETMI = db.etmi;

exports.createETMI = async (req, res) => {
  try {
    const etmi = new ETMI({
      ...req.body,
    });

    await etmi.save();

    return res.status(201).json({ message: "ETMI creado exitosamente." });
  } catch (error) {
    console.error("Error al crear ETMI:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllETMIs = async (req, res) => {
  try {
    const filter = req.query.mujerId ? { mujerId: req.query.mujerId } : {};
    const etmis = await ETMI.find(filter).populate('mujerId');
    return res.status(200).json(etmis);
  } catch (error) {
    console.error("Error al obtener todos los ETMIs:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getETMIById = async (req, res) => {
  try {
    const etmiId = req.params.etmiId;
    const etmi = await ETMI.findById(etmiId);

    if (!etmi) {
      return res.status(404).json({ message: "ETMI no encontrado." });
    }

    return res.status(200).json(etmi);
  } catch (error) {
    console.error("Error al obtener ETMI por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateETMI = async (req, res) => {
  try {
    const etmiId = req.params.etmiId;
    const { /* otros campos */ } = req.body;

    const etmi = await ETMI.findById(etmiId);

    if (!etmi) {
      return res.status(404).json({ message: "ETMI no encontrado." });
    }

    // Actualiza los campos necesarios
    // etmi.campo = req.body.campo;

    await etmi.save();

    return res.status(200).json({ message: "ETMI actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar ETMI:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteETMI = async (req, res) => {
  try {
    const etmiId = req.params.etmiId;
    const etmi = await ETMI.findById(etmiId);

    if (!etmi) {
      return res.status(404).json({ message: "ETMI no encontrado." });
    }

    await etmi.remove();

    return res.status(200).json({ message: "ETMI eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar ETMI:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
