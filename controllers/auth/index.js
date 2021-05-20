const { Router } = require("express");
const router = Router();
const passport = require("../../middleware/passport-facebook");

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "auth/facebook/fail",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: "email",
  })
);

router.get("/facebook/success", (req, res) => {
  res.send(req.user);
});

router.get("/facebook/fail", (_, res) => {
  res.send("facebook login fail");
});

module.exports = router;
