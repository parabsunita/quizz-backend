const Question = require("../models/Question");

// Fetch questions for a specific topic
const getQuestions = async (req, res) => {
  const { topic } = req.params;
console.log("topic",topic)
  try {
    // Find questions for the given topic
    const questions = await Question.find({ topic });
    console.log("questions",questions)

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "No questions found for this topic" });
    }

    // Shuffle and return a random subset of questions (e.g., 5 questions)
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

    res.status(200).json(shuffledQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getQuestionsForMultipleTopics = async (req, res) => {
    const { topics } = req.body; // Pass topics as an array in the body
  
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({ message: "Please provide an array of topics" });
    }
  
    try {
      const questions = await Question.find({ topic: { $in: topics } });
  
      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: "No questions found for the selected topics" });
      }
  
      const shuffledQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
      res.status(200).json(shuffledQuestions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  const createQuestion = async (req, res) => {
    const { topic, question, options, correctAnswer } = req.body;
  
    // Validate the input
    if (!topic || !question || !options || !correctAnswer) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }
  
    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ message: "Options should be an array with at least two choices" });
    }
  
    try {
      const newQuestion = new Question({
        topic,
        question,
        options,
        correctAnswer,
      });
  
      await newQuestion.save();
  
      res.status(201).json({ message: "Question created successfully", question: newQuestion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
  module.exports = {
    getQuestions,
    getQuestionsForMultipleTopics,
    createQuestion,
  };
  

