const express = require('express');

const addressController = require('../controller/address.js');
const isAuthMiddleware = require('../middleware/isAuth.js');

const router = express.Router();

router.get('/addresses', isAuthMiddleware, addressController.getAddress);

router.get('/subDistricts', isAuthMiddleware, addressController.getSubDistricts);

module.exports = router;