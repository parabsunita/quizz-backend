const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    console.log( req.header("Authorization"))
  const token = req.header("Authorization"); // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { protect };
