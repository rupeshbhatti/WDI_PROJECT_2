const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true}, //the email is used as the username. It is mandatory and must be unique
  password: {type: String, required: true},
  avatar: {type: String} //avatar is optional and will be a path to where the avatar image is stored on the database
});

module.exports = mongoose.model('User', userSchema);
