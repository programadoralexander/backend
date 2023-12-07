const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.createUser = async (req, res) => {
  try {
    const { nombre, apellido, cedula, email, password, roles } = req.body;

   
    // Validar que el nombre de usuario y correo electrónico sean únicos
   
    // const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    // if (existingUser) {
    //   return res.status(400).json({ message: "El nombre de usuario o correo electrónico ya está en uso." });
    // }


    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = new User({
      nombre,
      apellido,
      cedula,
      email,
      password: hashedPassword,
      roles,
    });

    await user.save();

    return res.status(201).json({ message: "Usuario creado exitosamente." });
  } catch (error) {
    
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('roles');
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { nombre, apellido,  cedula, email, password, roles } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const existingUser = await User.findOne({ $and: [{ _id: { $ne: userId } }, { $or: [{ cedula }, { email }] }] });
    if (existingUser) {
      return res.status(400).json({ message: "El nombre de usuario o correo electrónico ya está en uso." });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    // Actualizar los datos del usuario
    user.nombre = nombre;
    user.apellido =apellido;
    user.cedula = cedula;
    user.email = email;
    user.password = hashedPassword;
    user.roles = roles;

    await user.save();

    return res.status(200).json({ message: "Usuario actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    await user.remove();

    return res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};