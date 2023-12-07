const { authJwt } = require("../middlewares");
const control = require("../controllers/controlmujer.controller");

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/controlmujer", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], control.createControlMujer);
  app.get("/api/controlmujer", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], control.getAllControlesMujer);
  app.get("/api/controlmujer/:controlMujerId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], control.getControlMujerById);
  app.put("/api/controlmujer/:controlMujerId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], control.updateControlMujer);
  app.delete("/api/controlmujer/:controlMujerId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], control.deleteControlMujer);
};
