const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

const {validateSignUp} = require("../validation/signup");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
     
      verifySignUp.checkDuplicateCedulaOrEmail,
      verifySignUp.checkRolesExisted,

    ],
    controller.signup,
    validateSignUp,
  );

  app.post("/api/auth/signin", controller.signin);
};
