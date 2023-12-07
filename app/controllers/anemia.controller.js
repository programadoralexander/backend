const db = require("../models");
const Anemia = db.anemia;

exports.createAnemia = async (req, res) => {
  try {
    const nuevaAnemia = new Anemia({
      ...req.body,
    });

    await nuevaAnemia.save();

    return res.status(201).json({ message: "Registro de anemia creado exitosamente." });
  } catch (error) {
    console.error("Error al crear registro de anemia:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllAnemias = async (req, res) => {
  try {
    const filter = req.query.ninoId ? { ninoId: req.query.ninoId } : {};
    const anemias = await Anemia.find(filter);
    return res.status(200).json(anemias);
  } catch (error) {
    console.error("Error al obtener todos los registros de anemia:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAnemiaById = async (req, res) => {
  try {
    const anemiaId = req.params.anemiaId;
    const anemiaEncontrada = await Anemia.findById(anemiaId);

    if (!anemiaEncontrada) {
      return res.status(404).json({ message: "Registro de anemia no encontrado." });
    }

    return res.status(200).json(anemiaEncontrada);
  } catch (error) {
    console.error("Error al obtener registro de anemia por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateAnemia = async (req, res) => {
  try {
    const anemiaId = req.params.anemiaId;
    const { /* otros campos */ } = req.body;

    const anemiaActualizada = await Anemia.findByIdAndUpdate(anemiaId, req.body);

    if (!anemiaActualizada) {
      return res.status(404).json({ message: "Registro de anemia no encontrado." });
    }

    await anemiaActualizada.save();

    return res.status(200).json({ message: "Registro de anemia actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar registro de anemia:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteAnemia = async (req, res) => {
  try {
    const anemiaId = req.params.anemiaId;
    const anemiaEliminar = await Anemia.findById(anemiaId);

    if (!anemiaEliminar) {
      return res.status(404).json({ message: "Registro de anemia no encontrado." });
    }

    await anemiaEliminar.remove();

    return res.status(200).json({ message: "Registro de anemia eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar registro de anemia:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
