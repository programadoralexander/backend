const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const { validateUser, validateUpdateUser} = require("../validation/user");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post("/api/users", [authJwt.verifyToken, authJwt.isAdmin], validateUser,  controller.createUser);
  app.get("/api/users", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsers);
  app.get("/api/users/:userId", [authJwt.verifyToken, authJwt.isAdmin], controller.getUserById);
  app.put("/api/users/:userId", [authJwt.verifyToken, authJwt.isAdmin], validateUpdateUser, controller.updateUser);
  app.delete("/api/users/:userId", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
};
