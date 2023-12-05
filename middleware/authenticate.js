const passport = require("passport");

const authenticateJWT = passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/auth/login",
});

module.exports = authenticateJWT;
