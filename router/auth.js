const express = require('express');
const { body } = require('express-validator');

const authController = require('../controller/auth.js');

const router = express.Router();

router.post(
  '/signup', 
  body('email').isEmail().withMessage('Please, input a valid email'),
  body('name').trim().not().isEmpty().withMessage('Please, input name required'),
  body('password').trim().isLength({min: 8}).withMessage('Please, required minimum 8 character for password'),
  authController.signUp);

  router.post('/login', authController.logIn);

module.exports = router;