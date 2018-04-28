const db = require ('../../database/dbFunctions.js');
const passport = require('../middleware/passport.js');
const Promise = require('bluebird');

const post = {};
const get = {};

post.signup = (req, res) => {
  db.saveUser(req.body)
    .then((result) => {
      result === false ? res.sendStatus(422) : res.sendStatus(200);
    })
};

post.login = (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    
    if (err || !user) {
      res.status(422).send(info);
    
    } else {

      user.password = undefined;
      user.salt = undefined;

      req.login(user, function (err) {
        if (err) {
          console.log('error logging in', err);
          res.status(400).send(err);
        } else {
          res.json(user);
        }
      });
    }
  })(req, res, next);
};

get.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
}

get.user = (req, res) => {
  
  if (req.user) {
    db.fetchUser(req.user.username).then(user => res.json(user));
  }
}

post.upload = (req, res) => {
  Promise.map(req.body, (picture) => {
    console.log(picture);
    return db.savePicture(picture)
    .then(() => {
      db.savePictureToUser(picture)
    })
    .catch((err) => {
      console.log('error uploading photo', err);
      res.status(500).send('error uploading photo');
    })
  })
  .then(() => res.end())
  .catch((err) => {
    console.log('error uploading photos', err);
    res.status(500).send('error uploading photos');
  })
}

// post.upload = (req, res) => 
//   db.savePicture(req.body)
//     .then(() => db.savePictureToUser(req.body))
//     .then(() => res.end())
//     .catch((err) => {
//       console.log('error uploading photo', err);
//       res.status(500).send('error uploading photo')
//     });

get.closestPics = function(req, res) {
  db.selectClosestPictures({lat: req.query.lat, lng: req.query.lng})
    .then((pictures) => {
      res.json(pictures);
    });
};

post.favorites = function(req, res) {
  db.addToFavorites(req.body)
    .then(() => {
      return db.fetchUser(req.body.username);
    })
    .then((data) => {
      res.json(data);
    })
}

 get.suggestions = function(req, res) {
  db.fetchUser(req.user.username).then((profile) => 
    profile.photos.reduce((acc, photo) => {
      photo.tags.forEach((tag) => 
      acc.tags[tag] ? acc.tags[tag]++ : acc.tags[tag] = 1)
      return acc;
    }, {user: req.user.username, tags: {}})
  ).then(({user, tags}) => 
  db.getSuggestions(user, tags)
  .then((data) => res.status(200).json(data))
  .catch((err) => console.error(err)));
}

let inc = {$set: {golf: 1, tannerSmells: 1}};
  

module.exports.get = get;
module.exports.post = post;