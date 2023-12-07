const { check } = require("express-validator");
const { validateResult } = require("../middlewares/validateHelper");
const db = require("../models");
const User = db.user;



const validateSignUp = [
  check('nombre','No ha enviado Nombre')
    .exists()
    .trim()
    .not()
    .isEmpty(),
    check('apellido','No ha enviado Apellido')
    .exists()
    .not()
    .isEmpty()
    .trim(),
  check("cedula", 'No ha enviado Cédula')
    .exists()
    .not()
    .isEmpty()
    .trim()
    .custom(async(value, { req }) => {

      if (!/^\d+$/.test(value)) {
        throw new Error("La cédula debe contener solo valores numéricos");
    }

    if (value.length !== 10) {
      throw new Error("La cédula debe tener exactamente 10 dígitos");
    }

        const existingCedula = await User.findOne({ cedula: value });
        if (existingCedula) {
            throw new Error("Cédula ya esta en uso");
    }

      
        return true;
      }),
    check('email','No ha enviado correo eletrócnico')
    .exists()
    .not()
    .isEmpty()
    .trim()
    .isEmail()
    .custom(async(value, { req }) => {
        const existingEmail = await User.findOne({ email: value });
        if (existingEmail) {
            throw new Error("Correo electrónico ya esta en uso!");
    }
        return true;
      }),
      check('password', 'No ha enviado contraseña')
      .exists()
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 8 }).withMessage('Mínimo 8 caracteres'),
  
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateSignUp };
