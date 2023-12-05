const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const authenticateJWT = require("../middleware/authenticate");

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
const { Admin } = require("../controllers/account");

router.get("/User/admin-dashboard", authenticateJWT, authorize(), Admin);

// Admin route to view and assign Instructors
router.get("/User/users-list", authenticateJWT, authorize(), getUsers);

// Admin route to assign a User as an Instructor
router.post(
  "/User/assign-instructor/:userId",
  authenticateJWT,
  authorize(),
  assignInstructor
);

// Student List route
router.get("/User/studentsList", authenticateJWT, authorize(), listStudents);

// Instructor List route
router.get(
  "/User/instructorsList",
  authenticateJWT,
  authorize(),
  listInstructors
);

// Get All Courses
router.get("/Course/courses", authenticateJWT, authorize(), allCourses);

// Add Course
router.get("/Course/addCourses", authenticateJWT, authorize(), addCourse);

// Create Course
router.post(
  "/Course/createCourses",
  authenticateJWT,
  authorize(),
  createCourse
);

// Update Course
router.put(
  "/Course/update-courses",
  authenticateJWT,
  authorize(),
  updateCourse
);

// Delete Course
router.delete(
  "/Course/delete-course/:id",
  authenticateJWT,
  authorize(),
  deleteCourse
);

// Assign Instructor To Course
router.get(
  "/User/assign-Inst-To-Course",
  authenticateJWT,
  authorize(),
  assignInstToCourse
);

// Enroll Course to instructor
router.post(
  "/Course/assign-instructor",
  authenticateJWT,
  authorize(),
  enrollInstructor
);

// DisEnroll Course from Instructor
router.delete(
  "/Course/disEnroll-instructor",
  authenticateJWT,
  authorize(),
  disEnrollInstructor
);

// Enroll Course to student
router.post(
  "/Course/enroll-student",
  authenticateJWT,
  authorize(),
  enrollStudent
);

// DisEnroll Course from student
router.delete(
  "/Course/disEnroll-student",
  authenticateJWT,
  authorize(),
  disEnrollStudent
);

module.exports = router;
