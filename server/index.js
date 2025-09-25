const express = require('express');
const cors = require('cors');
const vision = require('@google-cloud/vision');
const express = require('express');
const cors = require('cors');
const vision = require('@google-cloud/vision');
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const client = new vision.ImageAnnotatorClient({
  keyFilename: 'key.json'
});

app.post('/vision', async (req, res) => {
  const { imageBase64 } = req.body;
  try {
    const [result] = await client.labelDetection({
      image: { content: imageBase64 }
    });
    res.json(result.labelAnnotations || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Vision server running on port 5000'));