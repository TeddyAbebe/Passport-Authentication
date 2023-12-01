const router = require("express").Router();
const passport = require("passport");
const {
  Profile,
  Student,
  Instructor,
  Dashboard,
  Admin,
  myStudents,
  myCourses,
} = require("../controllers/account");
const { isStudent, isInstructor, isAdmin } = require("../middleware/authorize");

// Home Routes
router.get("/", (req, res) => {
  const messages = [];
  res.render("home", { body: "welcome", messages: messages });
});

// Protected Routes
router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  Profile
);

router.get(
  "/dashboard",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  Dashboard
);

router.get(
  "/admin-dashboard",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  Admin
);

router.get(
  "/instructor-dashboard",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isInstructor,
  Instructor
);

router.get(
  "/student-dashboard",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isStudent,
  Student
);

// Instructor Students List
router.get(
  "/myStudents",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isInstructor,
  myStudents
);

// Student Enrolled Courses List
router.get(
  "/myCourses",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isStudent,
  myCourses
);

module.exports = router;
