const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');

const User = require('../model/user.js');

dotenv.config();

exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      const error = new Error('Validation Failed');
      error.statusCode = 400;
      error.data = validationError.array()[0].msg;
      throw error;
    }

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      const error = new Error('Email already exist');
      error.statusCode = 400;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 16);

    const user = new User({
      name: name,
      email: email,
      password: hashedPw
    });

    await user.save();

    res.status(201).json({
      status: 201,
      message: 'Sign up successfully',
      email: email,
    })

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};