const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ msg: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    req.logIn(user, err => {
      if (err) return next(err);
      res.json({ 
        msg: 'Logged in', 
        user: { 
          id: user.id, 
          name: user.name, 
          email: user.email, 
          role: user.role,
          points: user.points 
        },
        redirectTo: user.role === 'admin' ? '/admin' : '/dashboard'
      });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ msg: 'Logged out' });
  });
};

exports.getProfile = (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ msg: 'Not authenticated' });
  res.json(req.user);
};
