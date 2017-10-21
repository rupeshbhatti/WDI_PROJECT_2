const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');
mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Toon = require('../models/toon');

// Drop the model
User.collection.drop();
Toon.collection.drop();

// Create the seed data and then close the connection
User
  .create([{
    email: 'rupesh.bhatti@hotmail.com',
    password: 'password',
    avatar: 'images/avatars/Avatar.jpg',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Toon
      .create([{
        toonName: 'He-Man And The Masters Of The Universe',
        imageFilepath: 'http://www.imisstheoldschool.com/wp-content/uploads/2011/04/he-man_L01.jpg',
        createdBy: '59eb781aef36172ed07ec55b'
      },{
        toonName: 'BraveStarr',
        imageFilepath: 'http://statici.behindthevoiceactors.com/behindthevoiceactors/_img/shows/banner_570.jpg',
        createdBy: '59eb781aef36172ed07ec55b'
      }]);
  })
  .then((toons) => console.log(`${toons.length} toons created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
