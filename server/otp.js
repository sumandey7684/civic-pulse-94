// Node.js Express backend for OTP generation and verification
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// In-memory store for OTPs (use DB for production)
const otpStore = {};

// Configure nodemailer with Gmail SMTP for production
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'subhasishrath6@gmail.com', // <-- CHANGE THIS
    pass: 'subhasishgmail@00',   // <-- CHANGE THIS
  },
});

// Generate OTP and send email
app.post('/api/request-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };
  try {
    const info = await transporter.sendMail({
      from: 'subhasishrath6@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('OTP send error:', err);
    res.status(500).json({ error: 'Failed to send OTP', details: err.message });
  }
});

// Verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];
  if (!record || record.otp !== otp || Date.now() > record.expires) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }
  // OTP is valid, allow password reset
  delete otpStore[email];
  res.json({ success: true });
});

app.listen(4000, () => console.log('OTP server running on port 4000'));
