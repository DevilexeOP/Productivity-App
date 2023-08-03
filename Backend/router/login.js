const env = require('dotenv').config();
const login_route = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

login_route.route('/login').post(async (req, res) => {
  try {
    //inputs
    const {email, password} = req.body;
    //regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //validation
    if (!(email && password)) {
      return res
        .status(400)
        .json({message: 'Email & Password cannot be empty'});
    } else if (!emailRegex.test(email)) {
      return res.status(400).json({message: 'Invalid Email format'});
    }
    // finding the user from db
    const user = await User.findOne({email});
    // checking if user is there give OK
    if (user && (await bcrypt.compare(password, user.password))) {
      // create a new token if the match is found
      const token = jwt.sign(
        {user_id: user._id, email},
        process.env.SECRET_KEY,
      );
      // assign and save the token\
      user.token = token;
      // returning the token
      return res.status(200).json({message: 'Login Successful'});
    }
    // if nothing matches return 401
    return res.status(401).json({message: 'Invalid Login Credentials'});
  } catch (error) {
    // handling internal server error
    res.status(500).json({message: 'Internal Server Error'});
  }
});

module.exports = login_route;
