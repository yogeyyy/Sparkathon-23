const jwt = require('jsonwebtoken');


// use this middleware to protect routes that require a specific role
function authorizeRole(requiredRole) {
  return (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userRole = decoded.role;

      if (userRole !== requiredRole) {
        return res.status(403).json({ message: 'Access forbidden' });
      }

      next(); // User has the required role, proceed to the next middleware
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}

module.exports = authorizeRole;