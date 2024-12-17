const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      req.user = await User.findById(decoded.id).select('-password'); // Fetch user
      next(); // Proceed to the next middleware or route
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ error: 'Not authorized, token invalid' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' }); // Handle missing token
  }
};

module.exports = protect;
