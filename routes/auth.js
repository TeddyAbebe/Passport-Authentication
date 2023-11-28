const router = require("express").Router();
const {
  Register,
  registerUser,
  Login,
  loginUser,
  logoutUser,
} = require("../controllers/auth");
const { Google, GoogleUser } = require("../controllers/google");
const validator = require("../validator/RegValidator");

// Register Routes
router.get("/register", Register);

router.post("/register", validator, registerUser);

// Login Routes
router.get("/login", Login);

router.post("/login", loginUser);

// Logout Route
router.get("/logout", logoutUser);

// Google OAuth
router.get("/google", Google);

router.get("/google/redirect", GoogleUser);

module.exports = router;
