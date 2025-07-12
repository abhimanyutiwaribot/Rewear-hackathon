// server/config/passport.js

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function (passport) {
  // Local Strategy for email/password
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' }, // tell Passport to use 'email' instead of 'username'
      async (email, password, done) => {
        try {
          // Find user by email
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, { message: 'No user found with that email.' });
          }

          // Match password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: 'Password incorrect.' });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Serialize user to store in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user to get data from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
