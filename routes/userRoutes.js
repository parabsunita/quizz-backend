const express = require("express");
const { registerUser, getAllUsers, loginUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", registerUser); // User Registration
router.post("/login", loginUser);       // User Login

// Protected Routes
router.get("/", protect, getAllUsers); // Get all users (secured route)

module.exports = router;
