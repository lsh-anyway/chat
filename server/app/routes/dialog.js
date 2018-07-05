const router = require("express-promise-router")();
const passport = require("passport");
require("../config/passport");

const DialogController = require("../controllers/dialog");
const { validateBody, schemas } = require("../helpers/routerHelpers");

router
  .route("/create")
  .post(
    validateBody(schemas.dialogSchema),
    passport.authenticate("jwt", { session: false }),
    DialogController.createDialog
  );

module.exports = router;
