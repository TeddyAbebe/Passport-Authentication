const { hashSync } = require("bcrypt");
const User = require("../models/User");

const Register = (req, res) => {
  res.render("home", { body: "register" });
};

const registerUser = (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashSync(req.body.password, 10),
  });

  user.save().then((user) => console.log(user));

  res.send({ success: true });
};

module.exports = { Register, registerUser };
