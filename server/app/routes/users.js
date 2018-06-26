const router = require("express-promise-router")();
const passport = require("passport");
require("../config/passport");

const UserController = require("../controllers/users");
const { validateBody, schemas } = require("../helpers/routerHelpers");

//注册
router
  .route("/signup")
  .post(validateBody(schemas.signSchema), UserController.signUp);

// 登录
router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate("local", { session: false }),
    UserController.signIn
  );

module.exports = router;
