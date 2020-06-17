const express = require('express');
const router = express.Router();
const businessCtrl = require('../controllers/business.controller');

router.post('/', businessCtrl.createBusiness);

router.get('/catalog', businessCtrl.getBusiness);

router.get('/:id', businessCtrl.getBusinessById);



module.exports = router;