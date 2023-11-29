const router = require("express").Router();
const passport = require("passport");
const {
  Profile,
  Student,
  Instructor,
  Dashboard,
  Admin,
  assignInstructor,
  getUsers,
} = require("../controllers/account");
const { isStudent, isInstructor, isAdmin } = require("../middleware/authorize");
const User = require("../models/User");
const { lisInstructors } = require("../controllers/adminController");

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
  (req, res) => {
    res.render("home", { body: "myStudents", user: req.user });
  }
);

module.exports = router;
