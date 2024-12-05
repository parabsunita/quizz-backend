const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { selectTopics } = require("../controllers/topicController");

const router = express.Router();

// Route to handle topic selection
router.post("/select", protect, selectTopics);

module.exports = router;
