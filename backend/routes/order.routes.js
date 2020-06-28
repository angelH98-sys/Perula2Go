const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/order.controller');

router.post('/', orderCtrl.createOrder);

//router.get('/', categoryCtrl.getCategories);

module.exports = router;