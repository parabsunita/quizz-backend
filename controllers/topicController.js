
const User = require('../models/User')

// Controller to handle topic selection
const selectTopics = async (req, res) => {
   
  try {
    const { topics } = req.body;
    console.log("selectTopics called",topics); 
    // Ensure the request includes topics
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({ message: "Please provide an array of topics" });
    }

    // Get the logged-in user's ID from the request (added by the `protect` middleware)
    const userId = req.user;
   

    // Find the user in the database
    const user = await User.findById(userId);
    console.log("selectTopics called",user); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Store the selected topics in the user's profile
    user.selectedTopics = topics;
    
    await user.save();
   
    res.status(200).json({
      message: "Topics selected successfully",
      selectedTopics: user.selectedTopics,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  selectTopics,
};
