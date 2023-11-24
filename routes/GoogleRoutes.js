const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Google = passport.authenticate("google", { scope: ["profile", "email"] });

const GoogleUser = (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect("/login");
    }

    const payload = {
      name: user.name,
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true });

    return res.redirect("/profile");
  })(req, res, next);
};

module.exports = { Google, GoogleUser };
