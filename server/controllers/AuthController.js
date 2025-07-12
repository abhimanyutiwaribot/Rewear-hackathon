import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/User.js';

export const register = async (req, res) => {
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

export const login = (req, res, next) => {
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
        redirectTo: '/' // Changed to redirect to landing page
      });
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout(() => {
    res.json({ msg: 'Logged out' });
  });
};

export const getProfile = (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ msg: 'Not authenticated' });
  res.json(req.user);
};
