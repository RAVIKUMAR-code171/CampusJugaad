const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { register, login, verifyOTP } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);

// Demo account login (no email / OTP needed)
router.post('/demo-login', async (req, res) => {
  try {
    const demoEmail = 'demo@campusjugaad.app';

    let user = await User.findOne({ email: demoEmail });
    if (!user) {
      // random password so nobody can log in to this account through the normal login form
      const randomPassword = crypto.randomBytes(24).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = new User({
        name: 'Demo Student',
        email: demoEmail,
        password: hashedPassword,
        college: 'GL Bajaj Institute',
        isVerified: true
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, college: user.college }
    });
  } catch (error) {
    console.error('Demo login error:', error);
    res.status(500).json({ message: 'Demo login failed' });
  }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      const user = JSON.stringify({ id: req.user._id, name: req.user.name, email: req.user.email, college: req.user.college });
      res.redirect(`https://campusjugaad.vercel.app/auth/success?token=${token}&user=${encodeURIComponent(user)}`);
    } catch (err) {
      res.redirect('https://campusjugaad.vercel.app/login');
    }
  }
);

module.exports = router;