const mongoose = require('mongoose');

const toonSchema = new mongoose.Schema({
  toonName: {type: String, required: true},
  imageFilepath: {type: String, required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User' } 
});

module.exports = mongoose.model('Toon', toonSchema);
