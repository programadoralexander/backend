// registroPerinatal.routes.js
const { authJwt } = require("../middlewares");
const controller = require("../controllers/registroPerinatal.controller");

module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/registrosPerinatales", [authJwt.verifyToken, authJwt.isAdmin], controller.createRegistroPerinatal);
  app.get("/api/registrosPerinatales", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllRegistrosPerinatales);
  app.get("/api/registrosPerinatales/:registroPerinatalId", [authJwt.verifyToken, authJwt.isAdmin], controller.getRegistroPerinatalById);
  app.put("/api/registrosPerinatales/:registroPerinatalId", [authJwt.verifyToken, authJwt.isAdmin], controller.updateRegistroPerinatal);
  app.delete("/api/registrosPerinatales/:registroPerinatalId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteRegistroPerinatal);

    
  app.post("/api/brigada/registrosPerinatales", [authJwt.verifyToken,authJwt.isBrigada], controller.createRegistroPerinatalForBrigada);
  app.get("/api/brigada/registrosPerinatales", [authJwt.verifyToken, authJwt.isBrigada], controller.getAllRegistrosPerinatalesForBrigada);
  app.get("/api/brigada/registrosPerinatales/:registroPerinatalId", [authJwt.verifyToken, authJwt.isBrigada], controller.getRegistroPerinatalByIdForBrigada);
  app.put("/api/brigada/registrosPerinatales/:registroPerinatalId", [authJwt.verifyToken,authJwt.isBrigada], controller.updateRegistroPerinatalForBrigada);
  app.delete("/api/brigada/registrosPerinatales/brigada/:registroPerinatalId", [authJwt.verifyToken,authJwt.isBrigada], controller.deleteRegistroPerinatalForBrigada);

};
