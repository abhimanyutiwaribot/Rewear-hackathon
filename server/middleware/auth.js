// Middleware to ensure user is authenticated
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ msg: 'Please log in to continue' });
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ msg: 'Access denied. Admin privileges required.' });
};

export default {
  ensureAuthenticated,
  isAdmin
};