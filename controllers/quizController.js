const Question = require("../models/Question");

const submitQuiz = async (req, res) => {
  const { responses } = req.body; // Expected format: { questionId: userAnswer }

  if (!responses || typeof responses !== "object") {
    return res.status(400).json({ message: "Invalid responses format" });
  }

  try {
    // Fetch questions matching the submitted question IDs
    const questionIds = Object.keys(responses);
    const questions = await Question.find({ _id: { $in: questionIds } });

    // Calculate the score
    let score = 0;
    const feedback = questions.map((question) => {
      const userAnswer = responses[question._id];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) score++;

      return {
        questionId: question._id,
        question: question.question,
        correctAnswer: question.correctAnswer,
        userAnswer,
        isCorrect,
      };
    });

    // Respond with the calculated score and feedback
    res.status(200).json({ score, feedback });
  } catch (error) {
    console.error("Error calculating quiz score:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  submitQuiz,
};
