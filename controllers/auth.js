const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { compare } = require("bcrypt");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const Login = (req, res) => {
  res.render("home", { body: "login", messages: [] });
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  const messages = [];

  if (!errors.isEmpty()) {
    messages.push(...errors.array());
    return res.render("home", { body: "login", messages: messages });
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await compare(req.body.password, user.password))) {
      messages.push({ msg: "Invalid Email or Password" });
      return res.render("home", { body: "login", messages: messages });
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
    messages.push({ msg: "Internal Server Error" });
    return res
      .status(500)
      .render("home", { body: "login", messages: messages });
  }
};

const LogoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
};

const Register = (req, res) => {
  res.render("home", { body: "register", messages: [] });
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("home", { body: "register", messages: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    res.status(500).render("home", {
      body: "register",
      messages: [{ msg: "Internal Server Error" }],
    });
  }
};

module.exports = { Login, loginUser, LogoutUser, Register, registerUser };
