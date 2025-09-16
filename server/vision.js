// Vision AI integration (Google Vision API example)
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const express = require('express');
const Issue = require('./models/Issue');
const User = require('./models/User');
const router = express.Router();

// POST /api/submit-issue
router.post('/submit-issue', async (req, res) => {
  const { citizenId, description, imageUrl } = req.body;
  if (!citizenId || !imageUrl) return res.status(400).json({ error: 'citizenId and imageUrl required' });

  // Call Google Vision API (replace with your API key)
  try {
    const visionRes = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`,
      {
        requests: [
          {
            image: { source: { imageUri: imageUrl } },
            features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
          },
        ],
      }
    );
    const labels = visionRes.data.responses[0].labelAnnotations?.map(l => l.description) || [];
    // Save issue in DB
    const issue = await Issue.create({
      citizenId,
      description,
      imageUrl,
      visionLabels: labels,
    });
    res.json({ success: true, issue });
  } catch (err) {
    console.error('Vision AI error:', err);
    res.status(500).json({ error: 'Vision AI detection failed', details: err.message });
  }
});

// GET /api/admin/issues
router.get('/admin/issues', async (req, res) => {
  // Optionally, check admin authentication here
  const issues = await Issue.find().populate('citizenId', 'email phone');
  res.json({ issues });
});

module.exports = router;
