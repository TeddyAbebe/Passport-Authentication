const passport = require("passport");
const jwt = require("jsonwebtoken");

const Login = (req, res) => {
  res.render("home", { body: "login" });
};

const loginUser = (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect("/login");
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        console.error(err);
        return res.redirect("/login");
      }

      // Generate Token and set it in a Cookie
      const generateJwtToken = (user) => {
        const payload = {
          sub: user._id,
        };

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
      };

      const token = generateJwtToken(user);
      res.cookie("token", token);

      return res.redirect("/profile");
    });
  });
};

module.exports = { Login, loginUser };
