const express = require('express');

const addressController = require('../controller/address.js');
const isAuthMiddleware = require('../middleware/isAuth.js');

const router = express.Router();

router.get('/address', isAuthMiddleware, addressController.getAddress);

module.exports = router;