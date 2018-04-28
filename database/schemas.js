const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  photos: [{}],
  likes: [{}],
  tags: {} // shows the weighted tags 
});

const PictureSchema = new mongoose.Schema({
  category: String,
  location: String,
  imageURL: String,
  description: String,
  username: String,
  user_id: String,
  loc: {
    type: {
      default: 'Point', 
      type: String
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    tags: [String] // store tags in array 
  }
});

module.exports.UserSchema = UserSchema;
module.exports.PictureSchema = PictureSchema;
