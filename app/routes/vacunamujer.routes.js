const { authJwt } = require("../middlewares");
const controller = require("../controllers/vacunamujer.controller");

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/vacunamujer", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.createVacunaMujer);
  app.get("/api/vacunamujer", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getAllVacunasMujer);
  app.get("/api/vacunamujer/:vacunaMujerId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getVacunaMujerById);
  app.put("/api/vacunamujer/:vacunaMujerId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.updateVacunaMujer);
  app.delete("/api/vacunamujer/:vacunaMujerId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.deleteVacunaMujer);
};
