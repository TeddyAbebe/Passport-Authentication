const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  google: {
    id: String,
    email: String,
    name: String,
  },
  role: {
    type: String,
    enum: ["Student", "Instructor", "Admin"],
    default: "Student",
  },
  assignedCourses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      courseName: String,
      courseCode: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
