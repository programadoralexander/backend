// niños.routes.js
const { authJwt } = require("../middlewares");
const controller = require("../controllers/niños.controller");

const { validateNiño, validateUpdateNiño } = require("../validation/niño");

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/nino", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], validateNiño, controller.createNiño);
  app.get("/api/nino", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getAllNiños);
  app.get("/api/nino/:ninoId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getNiñoById);
  app.put("/api/nino/:ninoId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], validateUpdateNiño, controller.updateNiño);
  app.delete("/api/nino/:ninoId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.deleteNiño);
};
