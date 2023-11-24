require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { compare } = require("bcrypt");

const Login = (req, res) => {
  res.render("home", { body: "login" });
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // No user found
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Can't find a User.",
      });
    }

    // Incorrect Password
    if (!(await compare(req.body.password, user.password))) {
      return res.status(401).send({
        success: false,
        message: "Incorrect Password",
      });
    }

    const payload = {
      name: user.name,
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send the token to the client
    res.cookie("token", token, { httpOnly: true });

    return res.redirect("/profile");
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { Login, loginUser };
