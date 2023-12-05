const router = require("express").Router();
const authorize = require("../middleware/authorize");
const authenticateJWT = require("../middleware/authenticate");
const { myCourses, Student } = require("../controllers/account");

router.get("/User/student-dashboard", authenticateJWT, Student);

// Student Enrolled Courses List
router.get("/Course/myCourses", authenticateJWT, authorize(), myCourses);

module.exports = router;
