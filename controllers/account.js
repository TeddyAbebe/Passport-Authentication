const User = require("../models/User");
const Course = require("../models/Course");

const Dashboard = (req, res) => {
  let dashboardRoute;
  switch (req.user.role) {
    case "Student":
      dashboardRoute = "/student/User/student-dashboard";
      break;
    case "Instructor":
      dashboardRoute = "/instructor/User/instructor-dashboard";
      break;
    case "Admin":
      dashboardRoute = "/admin/User/admin-dashboard";
      break;
  }

  res.render("home", {
    body: "dashboard",
    user: req.user,
    dashboardRoute: dashboardRoute,
  });
};

const Admin = (req, res) => {
  res.render("home", { body: "admin", user: req.user });
};

const Instructor = (req, res) => {
  res.render("home", { body: "instructor", user: req.user });
};

const myStudents = async (req, res) => {
  try {
    // Find the currently logged-in instructor
    const instructorId = req.user._id;

    // Find the courses assigned to the instructor
    const instructor = await User.findById(instructorId).populate(
      "Courses.courseId"
    );

    if (!instructor || instructor.role !== "Instructor") {
      return res.status(404).json("Sorry, You are not an Instructor");
    }

    const studentsByCourse = [];

    // Iterate over the courses assigned to the instructor
    for (const course of instructor.Courses) {
      // Find students enrolled in the current course
      const students = await User.find({
        role: "Student",
        "Courses.courseId": course.courseId,
      });

      studentsByCourse.push({
        courseName: course.courseName,
        courseCode: course.courseCode,
        students: students,
      });
    }

    res.render("home", {
      body: "myStudents",
      user: req.user,
      studentsByCourse,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const Student = (req, res) => {
  res.render("home", { body: "student", user: req.user });
};

const myCourses = async (req, res) => {
  try {
    // Find the currently logged-in student
    const studentId = req.user._id;

    // Find the student's details along with enrolled courses
    const student = await User.findById(studentId).populate("Courses.courseId");

    if (!student || student.role !== "Student") {
      return res.status(404).json("Sorry, You are not a Student");
    }

    // Extract enrolled courses
    const enrolledCourses = student.Courses.map((course) => course.courseId);

    // Find the details of each enrolled course along with instructors
    const coursesWithInstructors = await Course.find({
      _id: { $in: enrolledCourses },
    }).populate("instructors.instructorId");

    res.render("home", {
      body: "myCourses",
      user: req.user,
      coursesWithInstructors,
    });
  } catch (error) {
    console.error("Error fetching student courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  Dashboard,
  Admin,
  Instructor,
  myStudents,
  Student,
  myCourses,
};
