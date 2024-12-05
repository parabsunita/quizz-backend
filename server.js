const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const topicRoutes = require("./routes/topicRoutes");
const questionRoutes = require("./routes/questionRoutes");
const quizRoutes = require("./routes/quizRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quizz", quizRoutes);
// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  });


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:5000}`));
