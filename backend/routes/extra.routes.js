const express = require('express');
const router = express.Router();
const extraCtrl = require('../controllers/extra.controller');

router.post('/', extraCtrl.createExtra);
/*
router.get('/', categoryCtrl.getCategories);
*/
module.exports = router;