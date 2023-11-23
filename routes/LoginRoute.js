const passport = require("passport");

const Login = (req, res) => {
  res.render("home", { body: "login", messages: req.flash("error") });
};

const loginUser = passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
});

module.exports = { Login, loginUser };
