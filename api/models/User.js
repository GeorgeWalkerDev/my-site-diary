const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  refreshToken: [String],
  roles: {
    type: [String],
    default: ['User'],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
