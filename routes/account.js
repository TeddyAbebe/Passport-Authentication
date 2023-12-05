const router = require("express").Router();
const authenticateJWT = require("../middleware/authenticate");
const { Dashboard } = require("../controllers/account");

// Home Routes
router.get("/", (req, res) => {
  const messages = [];
  res.render("home", { body: "welcome", messages: messages });
});

router.get("/User/dashboard", authenticateJWT, Dashboard);

module.exports = router;
