// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const adminRoutes = require('./routes/adminRoutes');

require('./config/passport')(passport);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware: Allow frontend to connect
app.use(cors({
  origin: 'http://localhost:5173', // your React Vite URL
  credentials: true
}));

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// ✅ Sessions for login persistence
app.use(session({
  secret: process.env.SESSION_SECRET || 'yoursecret',
  resave: false,
  saveUninitialized: false
}));

// ✅ Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Simple health check route
app.get('/', (req, res) => {
  res.send('✅ ReWear API is running!');
});

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
