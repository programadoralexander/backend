const { authJwt } = require("../middlewares");
const controller = require("../controllers/etmi.controller");


module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/etmi", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.createETMI);
  app.get("/api/etmi", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getAllETMIs);
  app.get("/api/etmi/:etmiId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getETMIById);
  app.put("/api/etmi/:etmiId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.updateETMI);
  app.delete("/api/etmi/:etmiId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.deleteETMI);
};
