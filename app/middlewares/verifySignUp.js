const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateCedulaOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    cedula: req.body.cedula
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Cédula ya está en uso!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Correo electrónico ya existe!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Fallo! Rol ${req.body.roles[i]} no existe!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateCedulaOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
