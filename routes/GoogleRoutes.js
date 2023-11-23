const passport = require("passport");

const Google = passport.authenticate("google", { scope: ["profile", "email"] });

const GoogleUser = passport.authenticate("google", {
  failureRedirect: "/login",
  successRedirect: "/profile",
});

module.exports = { Google, GoogleUser };
