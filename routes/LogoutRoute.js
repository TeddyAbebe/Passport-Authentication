const LogoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
};

module.exports = { LogoutUser };
