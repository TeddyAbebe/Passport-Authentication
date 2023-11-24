const passport = require("passport");

const Profile = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home", {
      user: req.user,
      body: "profile",
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { Profile };
