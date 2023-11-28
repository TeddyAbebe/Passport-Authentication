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
  "/student-dashboard",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isStudent,
  Student
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
  "/admin-dashboard",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  Admin
);

router.get(
  "/courses",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  (req, res) => {
    res.render("home", { body: "courses", user: req.user });
  }
);

router.get(
  "/studentsList",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isInstructor,
  (req, res) => {
    res.render("home", { body: "studentList", user: req.user });
  }
);

// Admin route to view and assign instructors
router.get(
  "/users-list",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  getUsers
);

// Admin route to assign a User as an Instructor
router.post(
  "/assign-instructor/:userId",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  assignInstructor
);
module.exports = router;
