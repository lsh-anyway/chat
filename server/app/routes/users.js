const router = require("express-promise-router")();

const UserController = require("../controllers/users");

//注册
router.route("/signup").post(UserController.signUp);
// 登录
router.route("/signin").post(UserController.signIn);

module.exports = router;
