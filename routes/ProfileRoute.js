const Profile = (req, res) => {
  if (req.user) {
    res.render("home", {
      user: req.user,
      body: "profile",
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { Profile };
