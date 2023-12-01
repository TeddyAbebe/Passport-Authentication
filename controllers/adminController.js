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
const listInstructors = async (req, res) => {
  try {
    // Fetch instructors from the database
    const instructors = await User.find({ role: "Instructor" });

    // Render the page with the list of instructors and assigned courses
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
    // Fetch courses from the database
    const courses = await Course.find();

    // Render the page with the list of Students
    res.render("home", {
      body: "studentList",
      user: req.user,
      messages: [],
      courses,
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Assign Instructor To Course
const assignInstToCourse = async (req, res) => {
  try {
    // Fetch all instructors
    const instructors = await User.find({ role: "Instructor" });

    // Fetch all courses
    const courses = await Course.find();

    res.render("home", {
      body: "assignInst",
      user: req.user,
      messages: [],
      courses,
      instructors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all Course
const allCourses = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find();

    res.render("home", {
      body: "allCourses",
      user: req.user,
      messages: [],
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add Course
const addCourse = async (req, res) => {
  res.render("home", {
    body: "addCourse",
    messages: [],
  });
};

// Create a new course
const createCourse = async (req, res) => {
  const { name, description, code } = req.body;
  const messages = [];

  try {
    // Check if required fields are filled
    if (!name || !description || !code) {
      messages.push({ msg: "Please fill in all required fields" });
      return res.render("home", { body: "addCourse", messages });
    }

    const existingCourse = await Course.findOne({ code });

    if (existingCourse) {
      messages.push({ msg: "Course already exists" });
      return res.render("home", { body: "addCourse", messages });
    }

    const newCourse = new Course({
      name,
      description,
      code,
    });

    await newCourse.save();
    messages.push({ msg: "Course created successfully" });

    res.render("home", {
      body: "addCourse",
      messages,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    messages.push({ msg: "Internal Server Error" });
    res.render("home", { body: "addCourse", messages });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  const { courseId, name, description, code } = req.body;
  const messages = [];

  try {
    // Check if required fields are filled
    if (!courseId || !name || !description || !code) {
      messages.push({ msg: "Please fill in all required fields" });
      return res.render("home", {
        body: "allCourses",
        user: req.user,
        messages,
      });
    }

    const existingCourse = await Course.findById(courseId);

    if (!existingCourse) {
      messages.push({ msg: "Course not found" });
      return res.render("home", {
        body: "allCourses",
        user: req.user,
        messages,
      });
    }

    // Update course fields
    existingCourse.name = name;
    existingCourse.description = description;
    existingCourse.code = code;

    // Save the updated course
    await existingCourse.save();

    // Update course details in assignedCourses array for each instructor
    const instructors = await User.find({ role: "Instructor" });

    for (const instructor of instructors) {
      const assignedCourse = instructor.assignedCourses.find(
        (assignedCourse) =>
          assignedCourse.courseId && assignedCourse.courseId.equals(courseId)
      );

      if (assignedCourse) {
        assignedCourse.courseName = name;
        assignedCourse.courseCode = code;
      }
    }

    // Save the updated instructors
    await Promise.all(instructors.map((instructor) => instructor.save()));

    // Update course details in enrolledCourses array for each student
    const students = await User.find({ role: "Student" });

    for (const student of students) {
      const enrolledCourse = student.enrolledCourses.find(
        (course) => course.courseId && course.courseId.equals(courseId)
      );

      if (enrolledCourse) {
        enrolledCourse.courseName = name;
        enrolledCourse.courseCode = code;
      }
    }

    // Save the updated students
    await Promise.all(students.map((student) => student.save()));

    messages.push({ msg: "Course updated successfully" });

    // Fetch all courses from the database
    const courses = await Course.find();

    // Render the view with the updated course
    res.render("home", {
      body: "allCourses",
      user: req.user,
      messages,
      courses,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  const messages = [];

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      messages.push({ msg: "Course not found" });
      return res.render("home", {
        body: "allCourses",
        user: req.user,
        messages,
      });
    }

    // Remove the course from the database
    await course.deleteOne();

    // Remove the course from the assignedCourses array of all instructors
    const instructors = await User.find({ role: "Instructor" });

    for (const instructor of instructors) {
      const assignedCourseIndex = instructor.assignedCourses.findIndex(
        (assignedCourse) =>
          assignedCourse.courseId && assignedCourse.courseId.equals(courseId)
      );

      if (assignedCourseIndex !== -1) {
        instructor.assignedCourses.splice(assignedCourseIndex, 1);
      }
    }

    // Save the updated instructors
    await Promise.all(instructors.map((instructor) => instructor.save()));

    // Remove the course from the enrolledCourses array of all students
    const students = await User.find({ role: "Student" });

    for (const student of students) {
      const enrolledCourseIndex = student.enrolledCourses.findIndex(
        (enrolledCourse) =>
          enrolledCourse.courseId && enrolledCourse.courseId.equals(courseId)
      );

      if (enrolledCourseIndex !== -1) {
        student.enrolledCourses.splice(enrolledCourseIndex, 1);
      }
    }

    // Save the updated students
    await Promise.all(students.map((student) => student.save()));

    messages.push({ msg: "Course deleted successfully" });

    // Fetch all courses from the database
    const courses = await Course.find();

    // Render the view with the updated course list
    res.render("home", {
      body: "allCourses",
      user: req.user,
      messages,
      courses,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Enroll an instructor to a course
const enrollInstructor = async (req, res) => {
  const { code, instructorId } = req.body;
  const messages = [];

  try {
    // Find the course by code
    const course = await Course.findOne({ code });

    if (!course) {
      messages.push({ msg: "Course not found" });
    } else {
      // Check if the instructorId is valid
      const instructor = await User.findById(instructorId);

      if (!instructor || instructor.role !== "Instructor") {
        messages.push({ msg: "Instructor not found" });
      } else {
        // Check if the instructor is already enrolled in the course
        if (
          course.instructors &&
          course.instructors.some(
            (inst) =>
              inst.instructorId && inst.instructorId.equals(instructorId)
          )
        ) {
          messages.push({ msg: "Instructor already enrolled in the course" });
        } else {
          // Enroll the instructor in the course
          course.instructors.push({
            instructorId: instructor._id,
            instructorName: instructor.name,
          });

          // Update assignedCourses for the instructor
          const assignedCourse = {
            courseId: course._id,
            courseName: course.name,
            courseCode: course.code,
          };

          instructor.assignedCourses.push(assignedCourse);

          await Promise.all([course.save(), instructor.save()]);

          messages.push({ msg: "Instructor Enrolled Successfully" });
        }
      }
    }

    // Get instructors and courses
    const instructors = await User.find({ role: "Instructor" });
    const courses = await Course.find();

    res.render("home", {
      body: "assignInst",
      user: req.user,
      messages,
      courses,
      instructors,
    });
  } catch (error) {
    console.error("Error enrolling instructor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DisEnroll Instructor from a course
const disEnrollInstructor = async (req, res) => {
  const { code, instructorId } = req.body;
  let messages = [];

  try {
    // Find the course by code
    const course = await Course.findOne({ code });

    if (!course) {
      messages.push("Course not found");
    } else {
      // Check if the instructorId is valid
      const instructor = await User.findById(instructorId);

      if (!instructor || instructor.role !== "Instructor") {
        messages.push({ msg: "Instructor not found" });
      } else {
        const instructorIndex = course.instructors.findIndex(
          (inst) => inst.instructorId && inst.instructorId.equals(instructorId)
        );

        if (instructorIndex !== -1) {
          // Remove the instructor from the course
          course.instructors.splice(instructorIndex, 1);

          // Remove the course from the assignedCourses of the instructor
          const assignedCourseIndex = instructor.assignedCourses.findIndex(
            (assignedCourse) =>
              assignedCourse.courseId &&
              assignedCourse.courseId.equals(course._id)
          );

          if (assignedCourseIndex !== -1) {
            instructor.assignedCourses.splice(assignedCourseIndex, 1);
          }

          await Promise.all([course.save(), instructor.save()]);
          messages.push({ msg: "Instructor Removed Successfully" });
        }
      }
    }

    // Get instructors and courses
    const instructors = await User.find({ role: "Instructor" });
    const courses = await Course.find();

    res.render("home", {
      body: "assignInst",
      user: req.user,
      messages,
      courses,
      instructors,
    });
  } catch (error) {
    console.error("Error removing instructor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Enroll a student to a course
const enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;
  const messages = [];

  try {
    // Find the student by ID
    const student = await User.findById(studentId);

    if (!student || student.role !== "Student") {
      messages.push({ msg: "Student not found" });
    } else {
      // Find the course by ID
      const course = await Course.findById(courseId);

      if (!course) {
        messages.push({ msg: "Course not found" });
      } else {
        // Check if the student is already enrolled in the course
        if (
          student.enrolledCourses &&
          student.enrolledCourses.some(
            (enrolledCourse) =>
              enrolledCourse.courseId &&
              enrolledCourse.courseId.equals(courseId)
          )
        ) {
          messages.push({ msg: "Student already enrolled in the course" });
        } else {
          // Enroll the student in the course
          student.enrolledCourses.push({
            courseId: course._id,
            courseName: course.name,
            courseCode: course.code,
          });

          // Save the updated student
          await student.save();

          messages.push({ msg: "Student Enrolled Successfully" });
        }
      }
    }

    // Get the updated list of students
    const students = await User.find({ role: "Student" });
    const courses = await Course.find();

    res.render("home", {
      body: "studentList",
      user: req.user,
      students,
      courses,
      messages,
    });
  } catch (error) {
    console.error("Error enrolling student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DisEnroll a student from a course
const disEnrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;
  const messages = [];

  try {
    // Find the student by ID
    const student = await User.findById(studentId);

    if (!student || student.role !== "Student") {
      messages.push({ msg: "Student not found" });
    } else {
      // Check if the student is enrolled in the specified course
      const enrolledCourseIndex = student.enrolledCourses.findIndex(
        (enrolledCourse) =>
          enrolledCourse.courseId && enrolledCourse.courseId.equals(courseId)
      );

      if (enrolledCourseIndex !== -1) {
        // Remove the course from the student's enrolled courses
        student.enrolledCourses.splice(enrolledCourseIndex, 1);
        await student.save();
        messages.push({ msg: "Student Dis-Enrolled from the Course" });
      } else {
        messages.push({ msg: "Student is not Enrolled in the Course" });
      }
    }

    // Get the updated list of students
    const students = await User.find({ role: "Student" });
    const courses = await Course.find();

    res.render("home", {
      body: "studentList",
      user: req.user,
      students,
      courses,
      messages,
    });
  } catch (error) {
    console.error("Error dis-enrolling student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  assignInstructor,
  assignInstToCourse,
  allCourses,
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
};
