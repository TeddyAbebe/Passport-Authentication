const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isAdmin } = require("../middleware/authorize");
const {
  getUsers,
  getAllCourses,
  getCourseById,
  addCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  assignInstructor,
  listInstructors,
  listStudents,
  enrollInstructor,
  disEnrollInstructor,
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

// Course List route
router.get(
  "/courses",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  getAllCourses
);

// Get Course by ID
router.get(
  "/courses/:id",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  getCourseById
);

// Add Course
router.post(
  "/addCourses",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  createCourse
);

// Update Course
router.put(
  "/courses/:id",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  updateCourse
);

// Delete Course
router.delete(
  "/courses/:id",
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

// DisEnroll Course to instructor
router.post(
  "/remove-instructor",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/auth/login",
  }),
  isAdmin,
  disEnrollInstructor
);

// Enroll Course to student
// router.post(
//   "/assign-student/:courseId/:studentId",
//   passport.authenticate("jwt", {
//     session: false,
//     failureRedirect: "/auth/login",
//   }),
//   isAdmin,
//   enrollStudent
// );

module.exports = router;
