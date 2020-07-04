const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');

router.post('/', productCtrl.createProduct);

router.get('/catalog/:id', productCtrl.getProduct);

router.get('/:id', productCtrl.getProductById);

router.get('/name/:id', productCtrl.getProductName);

router.get('/business/:business', productCtrl.getProductByBusiness);

module.exports = router;