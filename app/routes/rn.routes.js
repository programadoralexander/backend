const { authJwt } = require("../middlewares");
const rnController = require("../controllers/rn.controller");

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/rn", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], rnController.createRN);
  app.get("/api/rn", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], rnController.getAllRN);
  app.get("/api/rn/:rnId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], rnController.getRNById);
  app.put("/api/rn/:rnId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], rnController.updateRN);
  app.delete("/api/rn/:rnId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], rnController.deleteRN);
};
