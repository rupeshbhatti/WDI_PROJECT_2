const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');
const avatarPath = 'public/images';

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');

// Drop the model
User.collection.drop();

// Create the seed data and then close the connection
User
  .create([{
    email: 'rupesh.bhatti@hotmail.com',
    password: 'password',
    avatar: `${avatarPath}/Avatar.jpg`
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
