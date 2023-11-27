const {
  Register,
  registerUser,
  Login,
  loginUser,
  LogoutUser,
} = require("../controllers/auth");
const { Google, GoogleUser } = require("../controllers/google");
const { body } = require("express-validator");
const validator = require("../validator/RegValidator");

const router = require("express").Router();

// Register Routes
router.get("/register", Register);

router.post("/register", validator, registerUser);

// Login Routes
router.get("/login", Login);

router.post("/login", loginUser);

// Logout Route
router.get("/logout", LogoutUser);

// Google OAuth
router.get("/google", Google);

router.get("/google/redirect", GoogleUser);

module.exports = router;
