// Allows access to protected routes
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Export a middleware function that has access to Request and Response
// next() - callback that needs to be called to move to the next code
module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is invalid" });
  }
};
