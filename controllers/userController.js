const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Registration Controller
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, "-password"); // Exclude password field
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, getAllUsers, loginUser };
