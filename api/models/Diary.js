const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
  project: {
    type: String,
    required: true,
    trim: true,
  },
  weather: {
    type: String,
    default: 'N/A',
  },
  delays: {
    type: String,
    default: 'N/A',
  },
  variations: {
    type: String,
    default: 'N/A',
  },
  healthSafety: {
    type: String,
    default: 'N/A',
  },
  deliveries: {
    type: String,
    default: 'N/A',
  },
  notes: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model('Diary', DiarySchema);
