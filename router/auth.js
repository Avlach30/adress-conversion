const express = require('express');

const authController = require('../controller/auth.js');

const router = express.Router();

router.post('/signup', authController.signUp);

module.exports = router;