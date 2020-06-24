const express = require('express');
const router = express.Router();
const extraCtrl = require('../controllers/extra.controller');

router.post('/', extraCtrl.createExtra);

router.get('/:id', extraCtrl.getExtrasByProduct);

module.exports = router;