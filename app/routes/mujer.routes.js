// .routes.js
const { authJwt } = require("../middlewares");
const controller = require("../controllers/mujer.controller");

const { validateMujer, validateUpdateMujer} = require("../validation/mujer");


module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/mujer", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada ] ,validateMujer, controller.createMujer);
  app.get("/api/mujer", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getAllMujeres);
  app.get("/api/mujer/:mujerId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.getMujerById);
  app.put("/api/mujer/:mujerId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], validateUpdateMujer, controller.updateMujer);
  app.delete("/api/mujer/:mujerId", [authJwt.verifyToken, authJwt.isAdminOrModeratorOrBrigada], controller.deleteMujer);

    

};
