const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TestData', testSchema);