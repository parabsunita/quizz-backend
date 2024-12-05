const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getQuestions,createQuestion,getQuestionsForMultipleTopics } = require("../controllers/questionController");

const router = express.Router();

// Get questions based on selected topics
router.get("/:topic", protect, getQuestions);

router.post("/getQuestionsForMultipleTopics", protect, getQuestionsForMultipleTopics);
router.post("/create", protect, createQuestion);

module.exports = router;
