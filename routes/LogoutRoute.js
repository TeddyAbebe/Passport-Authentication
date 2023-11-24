const LogoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

module.exports = { LogoutUser };
