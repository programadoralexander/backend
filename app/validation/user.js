const { check } = require("express-validator");
const { validateResult } = require("../middlewares/validateHelper");
const db = require("../models");
const User = db.user;



const validateUser = [
  check('nombre')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe ubicar un nombre')
    .isAlpha()
    .withMessage('El nombre debe contener solo letras')
    .trim(),
    check('apellido','No ha enviado Apellido')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe ubicar un apellido')
    .isAlpha()
    .trim(),
  check("cedula")
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe ubicar una cédula')
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
    check('email')
    .exists()
    .not()
    .isEmpty().withMessage('Campo Correo eletrónico vacío')
    .trim()
    .isEmail().withMessage('Formato de Correo eletrónico inválido')
    .custom(async(value, { req }) => {
        const existingEmail = await User.findOne({ email: value });
        if (existingEmail) {
            throw new Error("Correo electrónico ya esta en uso!");
    }
        return true;
      }),
      check('password')
      .exists()
      .not()
      .isEmpty().withMessage('Campo Contraseña vacío')
      .trim()
      .isLength({ min: 8 }).withMessage('Contraseña debe tener mínimo 8 caracteres')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'i')
      .withMessage('La contraseña debe tener una letra mayúscula, una letra minúscula y un número'),
    check('roles','Selecciona un rol')
    .isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];


const validateUpdateUser = [
  check('nombre')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe ubicar un nombre')
    .isAlpha()
    .withMessage('El nombre debe contener solo letras')
    .trim(),
    check('apellido','No ha enviado Apellido')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe ubicar un apellido')
    .isAlpha()
    .withMessage('El apellido debe contener solo letras')
    .trim(),
  check("cedula", 'No ha enviado Cédula')
  .exists()
  .not()
  .isEmpty()
  .withMessage('Debe ubicar una cédula')
  .trim()
    .custom(async (value, { req }) => {
      if (!/^\d+$/.test(value)) {
        throw new Error("La cédula debe contener solo valores numéricos");
      }

      if (value.length !== 10) {
        throw new Error("La cédula debe tener exactamente 10 dígitos");
      }

      const existingCedula = await User.findOne({ cedula: value, _id: { $ne: req.params.userId } });
      if (existingCedula) {
        throw new Error("Cédula ya está en uso");
      }

      return true;
    }),
  check('email')
  .exists()
  .not()
  .isEmpty()
  .withMessage('Debe ubicar un correo')
    .trim()
    .isEmail().withMessage('Formato de Correo eletrónico inválido')
    .custom(async (value, { req }) => {
      const existingEmail = await User.findOne({ email: value, _id: { $ne: req.params.userId } });
      if (existingEmail) {
        throw new Error("Correo electrónico ya está en uso!");
      }
      return true;
    }),
  check('password')
  .exists()
  .not()
  .isEmpty()
  .withMessage('Debe ubicar una cédula')
    .isLength({ min: 8 }).withMessage('Contraseña debe tener mínimo 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'i')
    .withMessage('La contraseña debe tener una letra mayúscula, una letra minúscula y un número'),
  check('roles', 'Selecciona un rol')
    .optional()
    .isMongoId(),
    (req, res, next) => {
      validateResult(req, res, next);
    },
];

module.exports = { validateUser, validateUpdateUser };
