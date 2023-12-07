const { authJwt } = require("../middlewares");
const anemiaController = require("../controllers/anemia.controller");

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/anemia", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], anemiaController.createAnemia);
  app.get("/api/anemia", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], anemiaController.getAllAnemias);
  app.get("/api/anemia/:anemiaId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], anemiaController.getAnemiaById);
  app.put("/api/anemia/:anemiaId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], anemiaController.updateAnemia);
  app.delete("/api/anemia/:anemiaId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], anemiaController.deleteAnemia);
};
