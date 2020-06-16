const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/category.controller');

router.post('/', categoryCtrl.createCategory);

router.get('/', categoryCtrl.getCategories);

module.exports = router;