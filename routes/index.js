const router = require("express").Router();
const { Login, loginUser } = require("./LoginRoute");
const { Register, registerUser } = require("./RegisterRoute");
const { Profile } = require("./ProfileRoute");
const { LogoutUser } = require("./LogoutRoute");
const { Google, GoogleUser } = require("./GoogleRoutes");

// Home Routes
router.get("/", (req, res) => {
  res.render("home", { body: "welcome" });
});

// Register Routes
router.get("/register", Register);

router.post("/register", registerUser);

// Login Routes
router.get("/login", Login);

router.post("/login", loginUser);

// Protected Route
router.get("/profile", Profile);

// Logout Route
router.get("/logout", LogoutUser);

// Google OAuth
router.get("/google", Google);

router.get("/google/redirect", GoogleUser);

module.exports = router;
