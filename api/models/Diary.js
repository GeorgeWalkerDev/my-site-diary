const mongoose = require('mongoose')

const DiarySchema = new mongoose.Schema({
  project: {
    type: String,
    required: true,
    trim: true,
  },
  weather: {
    type: String,
  },
  delays: {
    type: String,
  },
  variations: {
    type: String,
  },
  healthSafety: {
    type: String,
  },
  deliveries: {
    type: String,
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
})

module.exports = mongoose.model('Diary', DiarySchema)