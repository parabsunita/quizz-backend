const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of options
    required: true,
  },
  correctAnswer: {
    type: String, // The correct answer
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
