const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  content: { type: String }
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.email;
  return user.id === this.createdBy.toString();
};

const toonSchema = new mongoose.Schema({
  toonName: {type: String, required: true},
  imageFilepath: {type: String, required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
});

toonSchema.methods.belongsTo = function toonBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.email;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Toon', toonSchema);
