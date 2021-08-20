const mongoose = require('mongoose');

module.exports = mongoose.model('Device', new mongoose.Schema({
  id: String,
  deviceid: String,
  device: String,
  devicebuilding: String,
  deviceroom: String,

}, { collection : 'topic4' }));