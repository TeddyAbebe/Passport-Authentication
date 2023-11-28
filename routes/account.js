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

// Course List route
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

// Student List route
router.get(
  "/studentsList",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  (req, res) => {
    res.render("home", { body: "studentList", user: req.user });
  }
);

// Instructor List route
router.get(
  "/instructorsList",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  async (req, res) => {
    try {
      // Fetch instructors from the database
      const instructors = await User.find({ role: "Instructor" });

      // Render the page with the list of instructors
      res.render("home", {
        body: "instructorList",
        user: req.user,
        instructors,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
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
