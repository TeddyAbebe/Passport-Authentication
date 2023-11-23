const Profile = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home", { user: req.user, body: "profile" });
  } else {
    req.flash("error", "You need to Login to access the Profile Page!");
    res.redirect("/login");
  }
  console.log(req.session);
  console.log(req.user);
};

module.exports = { Profile };
