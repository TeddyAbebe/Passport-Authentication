const bcrypt = require("bcrypt");
const User = require("../models/User");

const Register = (req, res) => {
  res.render("home", { body: "register" });
};

const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log(user);

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.flash("error", "Registration failed. Please try again.");
    res.redirect("/register");
  }
};

module.exports = { Register, registerUser };
