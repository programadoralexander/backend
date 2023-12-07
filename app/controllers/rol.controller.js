const db = require("../models");
const Rol = db.role;

exports.getAllRols = async (req, res) => {
    try {
      const rols = await Rol.find();
      return res.status(200).json(rols);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
};