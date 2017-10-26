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
    avatar: '/images/avatars/Avatar.jpg',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Toon
      .create([{
        toonName: 'He-Man And The Masters Of The Universe',
        imageFilepath: 'http://www.imisstheoldschool.com/wp-content/uploads/2011/04/he-man_L01.jpg',
        createdBy: users[0],
        comments: {
          createdBy: users[0],
          content: 'This was the shiznit'
        }
      // },{
      //   toonName: 'BraveStarr',
      //   imageFilepath: 'http://statici.behindthevoiceactors.com/behindthevoiceactors/_img/shows/banner_570.jpg',
      //   createdBy: users[0]
      // },{
      //   toonName: 'Inspector gadget',
      //   imageFilepath: 'http://www.liketotally80s.com/wp-content/uploads/2014/08/rbwc-inspector-gadget.jpg',
      //   createdBy: users[0]
      // },{
      //   toonName: 'Alvin and The Chipmunks',
      //   imageFilepath: 'http://www.liketotally80s.com/wp-content/uploads/2014/08/rbwc-chipmunks.jpg',
      //   createdBy: users[0],
      //   comments: {
      //     createdBy: users[0],
      //     content: 'This was the shiznit'
      //   }
      // },{
      //   toonName: 'The Jetsons',
      //   imageFilepath: 'http://www.liketotally80s.com/wp-content/uploads/2014/08/rbwc-jetsons.jpg',
      //   createdBy: users[0]
      // },{
      //   toonName: 'The Smurfs',
      //   imageFilepath: 'http://www.liketotally80s.com/wp-content/uploads/2014/08/smurfs-2.jpg',
      //   createdBy: users[0]
      // },{
      //   toonName: 'Thundercats',
      //   imageFilepath: 'https://vignette2.wikia.nocookie.net/thundercats/images/7/7e/619px-Vlcsnap-2014-03-12-21h52m32s82.jpg',
      //   createdBy: users[0]
      // },{
      //   toonName: 'Teenage mutant ninja turtles',
      //   imageFilepath: 'http://cdn.playbuzz.com/cdn/447ac729-b9c8-465e-8175-d2451e9a003d/be02891d-9188-40e7-8056-12057e371687.jpg',
      //   createdBy:users[0]
      // },{
      //   toonName: 'Danger mouse',
      //   imageFilepath: 'https://ichef.bbci.co.uk/childrens-responsive-ichef-live/r/400/1x/cbbc/DM-Ultimate-er-SP_16X9.jpg',
      //   createdBy: users[0]
      // },{
      //   toonName: 'Hong Kong Phooey',
      //   imageFilepath: 'https://billtaylorcsp.files.wordpress.com/2013/07/hong-kong-phooey.png',
      //   createdBy: users[0]
      // },{
      //   toonName: 'Tranformers',
      //   imageFilepath: 'http://cdn.hark.com/images/000/006/089/6089/original.0',
      //   createdBy: users[0]
      // },{
      //   toonName: 'Bananaman',
      //   imageFilepath: 'http://i4.mirror.co.uk/incoming/article3259984.ece/ALTERNATES/s1200/bananaman-TEASER-ONLY.jpg',
      //   createdBy: users[0]
      // },{
      },{
        toonName: 'Superted',
        imageFilepath: 'https://static.comicvine.com/uploads/original/13/132162/2849046-superted_l03.jpg',
        createdBy: users[0],
        comments: {
          createdBy: users[0],
          content: 'This was super'
        }
      }]);
  })
  .then((toons) => console.log(`${toons.length} toons created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
