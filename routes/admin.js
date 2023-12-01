const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isAdmin } = require("../middleware/authorize");
const {
  getUsers,
  assignInstructor,
  addCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  listInstructors,
  listStudents,
  enrollInstructor,
  disEnrollInstructor,
  enrollStudent,
  disEnrollStudent,
  assignInstToCourse,
  allCourses,
} = require("../controllers/adminController");

// Admin route to view and assign Instructors
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

// Student List route
router.get(
  "/studentsList",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  listStudents
);

// Instructor List route
router.get(
  "/instructorsList",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  listInstructors
);

// Assign Instructor To Course
router.get(
  "/assign-Inst-To-Course",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  assignInstToCourse
);

// Get All Courses
router.get(
  "/courses",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  allCourses
);

// Add Course
router.get(
  "/addCourses",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  addCourse
);

// Create Course
router.post(
  "/createCourses",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  createCourse
);

// Update Course
router.post(
  "/update-courses",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  updateCourse
);

// Delete Course
router.delete(
  "/delete-course/:id",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  deleteCourse
);

// Enroll Course to instructor
router.post(
  "/assign-instructor",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  enrollInstructor
);

// DisEnroll Course from Instructor
router.post(
  "/disEnroll-instructor",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  disEnrollInstructor
);

// Enroll Course to student
router.post(
  "/assign-course",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  enrollStudent
);

// DisEnroll Course from student
router.post(
  "/disEnroll-course",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  disEnrollStudent
);

module.exports = router;
