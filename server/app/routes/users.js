const router = require("express-promise-router")();

const UserController = require("../controllers/users");
const { validateBody, schemas } = require("../helpers/routerHelpers");

//注册
router
  .route("/signup")
  .post(validateBody(schemas.authSchema), UserController.signUp);

// 登录
router
  .route("/signin")
  .post(validateBody(schemas.authSchema), UserController.signIn);

module.exports = router;
