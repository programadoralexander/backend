const { authJwt } = require("../middlewares");
const controller = require("../controllers/vacuna.controller");

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/vacuna", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.createVacuna);
  app.get("/api/vacuna", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getAllVacunas);
  app.get("/api/vacuna/:vacunaId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getVacunaById);
  app.put("/api/vacuna/:vacunaId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.updateVacuna);
  app.delete("/api/vacuna/:vacunaId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.deleteVacuna);
};
