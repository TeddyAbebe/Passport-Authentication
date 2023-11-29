const Course = require("../models/Course");
const User = require("../models/User");

// Get all Users
const getUsers = async (req, res) => {
  try {
    // Fetch all users
    const users = await User.find();

    res.render("home", {
      body: "usersList",
      users,
      user: req.user,
      messages: [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Assign Instructor
const assignInstructor = async (req, res) => {
  const userId = req.params.userId;
  const messages = [];

  // Find the user to assign as an Instructor
  const user = await User.findById(userId);

  if (!user) {
    const users = await User.find();
    messages.push("User not found");
    return res.status(404).render("home", {
      body: "usersList",
      user: req.user,
      users,
      messages: messages,
    });
  } else {
    // Assign the user as an instructor
    user.role = "Instructor";
    await user
      .save()
      .then(messages.push("User assigned as an Instructor successfully"));

    // Fetch updated user list
    const users = await User.find();

    res.render("home", {
      body: "usersList",
      user: req.user,
      users,
      messages: messages,
    });
  }
};

// List Instructors
const lisInstructors = async (req, res) => {
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
};

// List Students
const listStudents = async (req, res) => {
  try {
    // Fetch Students from the database
    const students = await User.find({ role: "Student" });

    // Render the page with the list of Students
    res.render("home", {
      body: "studentList",
      user: req.user,
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    // Fetch all instructors
    const instructors = await User.find({ role: "Instructor" });

    // Fetch all courses
    const courses = await Course.find();

    res.render("home", {
      body: "courses",
      user: req.user,
      courses,
      instructors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const addCourse = async (req, res) => {
//   res.render("home", { body: "addCourse", messages: [] });
// };

// Create a new course
const createCourse = async (req, res) => {
  const { name, description, code } = req.body;

  console.log("Received data:", req.body);

  try {
    const newCourse = new Course({
      name,
      description,
      code,
    });

    await newCourse.save();
    res.json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  const { name, description } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.name = name;
    course.description = description;

    await course.save();
    res.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.remove();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Enroll an instructor to a course
const enrollInstructor = async (req, res) => {
  const { code, instructorId } = req.body;

  try {
    // Find the course by code
    const course = await Course.findOne({ code });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the instructorId is valid (you may want additional validation here)
    const instructor = await User.findById(instructorId);

    if (!instructor || instructor.role !== "Instructor") {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Enroll the instructor in the course
    course.instructors.push(instructorId);
    await course.save();

    res.json({ message: "Instructor enrolled successfully", course });
  } catch (error) {
    console.error("Error enrolling instructor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Enroll a student to a course
const enrollStudent = async (req, res) => {
  const { courseId, studentId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const student = await User.findById(studentId);
    if (!student || student.role !== "Student") {
      return res.status(404).json({ message: "Student not found" });
    }

    // Add logic to assign student to course (e.g., update course document with student details)
    // ...

    res.json({ message: "Student assigned to the course successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  assignInstructor,
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  lisInstructors,
  listStudents,
  enrollInstructor,
  enrollStudent,
};
