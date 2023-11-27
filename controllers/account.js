const Profile = (req, res) => {
  if (req.isAuthenticated()) {
    res.setHeader("Cache-Control", "no-store, private, must-revalidate");
    res.render("home", {
      user: req.user,
      body: "profile",
    });
  } else {
    res.render("home", {
      body: "login",
    });
  }
};

module.exports = { Profile };
