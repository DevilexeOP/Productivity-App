const mongoose = require('mongoose');
const shortid = require('shortid');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    default: 'USER',
  },
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
