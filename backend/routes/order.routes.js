const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/order.controller');

router.post('/', orderCtrl.createOrder);

router.get('/:userId', orderCtrl.getEraserOrder);

router.get('/business/:business', orderCtrl.getOrderByBusiness);

router.put('/:id', orderCtrl.addProduct);

router.put('/assignbusiness/:id', orderCtrl.assignBusiness);

router.put('/confirm/:id', orderCtrl.confirmOrder);

router.put('/changestatus/:id', orderCtrl.changeStatus);

module.exports = router;