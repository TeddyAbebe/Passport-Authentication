const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  instructorName: String,
});

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  instructors: [instructorSchema],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
