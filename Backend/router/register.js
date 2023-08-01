const register_route = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

register_route.route('/register').post(async (req, res) => {
  try {
    // inputs
    const {name, username, email, password} = req.body;

    //regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    //validation
    if (!(name && username && email && password)) {
      return res.status(400).json({message: 'ALL FIELDS ARE REQUIRED'});
    } else if (!emailRegex.test(email)) {
      return res.status(400).json({message: 'EMAIL FORMAT IS INVALID '});
    } else if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message:
          'Password must contain 6 characters : 1 Uppercase , 1 Number , 1 Special Char',
      });
    }

    // checking if user exists
    const oldUser = await User.findOne({email});
    if (oldUser) {
      return res
        .status(400)
        .json({message: 'Email already exists , Please Login '});
    }

    // hashing the password
    const hash = await bcrypt.hash(password, 10);
    // creating object
    const user = new User({
      name: name,
      username: username,
      email: email,
      password: hash,
    });
    // jwt token for authorization .
    const token = jwt.sign(
      {
        email: email,
      },
      process.env.SECRET_KEY,
    );
    // save the token
    user.token = token;
    await User.create(user);
    return res.status(201).json({message: 'User Created ! Login Now'});
  } catch (error) {
    res.status(500).json({message: 'Internal Server Error'});
  }
});

module.exports = register_route;
