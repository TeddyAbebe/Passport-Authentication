const router = require("express").Router();
const passport = require("passport");
const { Profile } = require("../controllers/account");

// Home Routes
router.get("/", (req, res) => {
  const messages = [];

  res.render("home", { body: "welcome", messages: messages });
});
// Protected Route
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  Profile
);

module.exports = router;
