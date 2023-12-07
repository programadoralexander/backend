const { authJwt } = require("../middlewares");
const controller = require("../controllers/tamizaje.controller");

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/tamizaje", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.createTamizaje);
  app.get("/api/tamizaje", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getAllTamizajes);
  app.get("/api/tamizaje/:tamizajeId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getTamizajeById);
  app.put("/api/tamizaje/:tamizajeId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.updateTamizaje);
  app.delete("/api/tamizaje/:tamizajeId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.deleteTamizaje);
};
