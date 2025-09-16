// Issue model for MongoDB
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  citizenId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: String,
  imageUrl: String,
  visionLabels: [String],
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Issue', issueSchema);
