const { check } = require("express-validator");
const { validateResult } = require("../middlewares/validateHelper");
const db = require("../models");
const Mujer = db.mujer; // Asegúrate de importar el modelo User si lo necesitas

const validateMujer = [
  check('hcu')
    .optional()
    .isLength({ max: 17 }).withMessage('El campo HCU debe tener entre 1 y 17 dígitos'),
  check('cedula')
    .exists()
    .not()
    .isEmpty().withMessage('Debe ubicar una cédula')
    .isNumeric().withMessage('La cédula debe contener solo valores numéricos')
    .isLength({ min: 10, max: 10 }).withMessage('La cédula debe tener exactamente 10 dígitos')
    .custom(async (value, { req }) => {
      const existingCedula = await Mujer.findOne({ cedula: value });
      if (existingCedula) {
        throw new Error(`Cédula ya está en uso    <a href="/mujer/${existingCedula._id}">Ir a su registro</a>  `);
      }
      return true;
    }),

  check('nombres')
    .exists()
    .not()
    .isEmpty().withMessage('Debe ubicar un nombre')
    .isAlpha().withMessage('El nombre debe contener solo letras')
    .trim(),

  check('apellidos')
    .exists()
    .not()
    .isEmpty().withMessage('Debe ubicar un apellido')
    .isAlpha().withMessage('El apellido debe contener solo letras')
    .trim(),

  check('discapacidad')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre discapacidad')
    .trim(),
  check('telfdomicilio')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar un número de teléfono de domicilio')
    .isNumeric().withMessage('El campo teléfono domicilio debe contener solo valores numéricos')
    .isLength({ max: 10 }).withMessage('El campo teléfono domicilio debe tener como máximo 10 dígitos')
    .trim(),

  check('celular')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar un número de celular')
    .isNumeric().withMessage('El campo celular debe contener solo valores numéricos')
    .isLength({ min: 10, max: 10 }).withMessage('El campo celular debe tener exactamente 10 dígitos')
    .trim(),

  check('direccion')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar una dirección')
    .isString().withMessage('El campo direccion debe ser una cadena de texto')
    .trim(),

  check('zona')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre la zona')
    .isString().withMessage('El campo zona debe ser una cadena de texto')
    .trim(),

  check('provincia')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre la provincia')
    .isString().withMessage('El campo provincia debe ser una cadena de texto')
    .trim(),

  check('canton')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre el cantón')
    .isString().withMessage('El campo canton debe ser una cadena de texto')
    .trim(),

  check('parroquia')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre la parroquia')
    .isString().withMessage('El campo parroquia debe ser una cadena de texto')
    .trim(),

  check('establecimiento')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre el establecimiento')
    .isString().withMessage('El campo establecimiento debe ser una cadena de texto')
    .trim(),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUpdateMujer = [
  check('hcu')
    .optional()
    .isLength({ max: 17 }).withMessage('El campo HCU debe tener entre 1 y 17 dígitos'),
  check('cedula')
    .exists()
    .not()
    .isEmpty().withMessage('Debe ubicar una cédula')
    .isNumeric().withMessage('La cédula debe contener solo valores numéricos')
    .isLength({ min: 10, max: 10 }).withMessage('La cédula debe tener exactamente 10 dígitos')
    .custom(async (value, { req }) => {
      const existingCedula = await Mujer.findOne({ cedula: value, _id: { $ne: req.params.mujerId } });
      if (existingCedula) {
        throw new Error(`Cédula ya está en uso    <a href="/mujer/${existingCedula._id}">Ir a su registro</a>  `);
      }
      return true;
    }),

  check('nombres')
    .exists()
    .not()
    .isEmpty().withMessage('Debe ubicar un nombre')
    .isAlpha().withMessage('El nombre debe contener solo letras')
    .trim(),

  check('apellidos')
    .exists()
    .not()
    .isEmpty().withMessage('Debe ubicar un apellido')
    .isAlpha().withMessage('El apellido debe contener solo letras')
    .trim(),

  check('discapacidad')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre discapacidad')
    .isString().withMessage('El campo discapacidad debe ser una cadena de texto')
    .trim(),

  check('telfdomicilio')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar un número de teléfono de domicilio')
    .isNumeric().withMessage('El campo telfdomicilio debe contener solo valores numéricos')
    .isLength({ max: 10 }).withMessage('El campo telfdomicilio debe tener como máximo 10 dígitos')
    .trim(),

  check('celular')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar un número de celular')
    .isNumeric().withMessage('El campo celular debe contener solo valores numéricos')
    .isLength({ min: 10, max: 10 }).withMessage('El campo celular debe tener exactamente 10 dígitos')
    .trim(),

  check('direccion')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar una dirección')
    .isString().withMessage('El campo direccion debe ser una cadena de texto')
    .trim(),

  check('zona')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre la zona')
    .isString().withMessage('El campo zona debe ser una cadena de texto')
    .trim(),

  check('provincia')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre la provincia')
    .isString().withMessage('El campo provincia debe ser una cadena de texto')
    .trim(),

  check('canton')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre el cantón')
    .isString().withMessage('El campo canton debe ser una cadena de texto')
    .trim(),

  check('parroquia')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre la parroquia')
    .isString().withMessage('El campo parroquia debe ser una cadena de texto')
    .trim(),

  check('establecimiento')
    .exists()
    .not()
    .isEmpty().withMessage('Debe proporcionar información sobre el establecimiento')
    .isString().withMessage('El campo establecimiento debe ser una cadena de texto')
    .trim(),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];



module.exports = {
  validateMujer,
  validateUpdateMujer
};
