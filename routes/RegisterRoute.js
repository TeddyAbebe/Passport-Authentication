const bcrypt = require("bcrypt");
const User = require("../models/User");

const Register = (req, res) => {
  res.render("home", { body: "register" });
};

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.redirect("/register");
  }
};

module.exports = { Register, registerUser };
