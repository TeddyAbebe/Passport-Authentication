const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  instructors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;