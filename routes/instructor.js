const router = require("express").Router();
const authorize = require("../middleware/authorize");
const authenticateJWT = require("../middleware/authenticate");
const { Instructor, myStudents } = require("../controllers/account");

router.get(
  "/User/instructor-dashboard",
  authenticateJWT,
  authorize(),
  Instructor
);

// Instructor Students List
router.get("/User/myStudents", authenticateJWT, authorize(), myStudents);

module.exports = router;
