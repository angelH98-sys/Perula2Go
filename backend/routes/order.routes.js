const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/order.controller');

router.post('/', orderCtrl.createOrder);

router.get('/:userId', orderCtrl.getEraserOrder);

router.put('/:id', orderCtrl.editOrder);

router.put('/onprocess/:id', orderCtrl.onProcess);

module.exports = router;