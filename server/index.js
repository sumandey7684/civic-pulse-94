const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Import OTP and Vision routes
const otpRoutes = require('./otp');
const visionRoutes = require('./vision');
app.use('/api', otpRoutes);
app.use('/api', visionRoutes);

app.listen(4000, () => console.log('Server running on port 4000'));