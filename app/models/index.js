const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

//mujer embarazada
db.mujer = require("./mujer/mujer.model");
db.etmi = require("./mujer/etmi.model");
db.controlmujer = require("./mujer/controlmujer.model");
db.vacunamujer = require("./mujer/vacunamujer.model");


//niños

db.niños = require("./niños/niños.model");
db.rn = require("./niños/rn.model");
db.control = require("./niños/control.model");
db.vacuna = require("./niños/vacuna.model");
db.tamizaje = require("./niños/tamizaje.model");
db.anemia = require("./niños/anemia.model");


db.registroPerinatal = require("./registroPerinatal.model");

db.ROLES = ["usuario", "administrador", "supervisor", "brigada"];

module.exports = db;