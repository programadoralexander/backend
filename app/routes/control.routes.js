const { authJwt } = require("../middlewares");
const controlController = require("../controllers/control.controller");

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/control", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controlController.createControl);
  app.get("/api/control", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controlController.getAllControls);
  app.get("/api/control/:controlId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controlController.getControlById);
  app.put("/api/control/:controlId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controlController.updateControl);
  app.delete("/api/control/:controlId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controlController.deleteControl);
};
