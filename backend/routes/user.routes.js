const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.post('/', userCtrl.createUser);

router.get('/:id', userCtrl.getUserById);

router.get('/address/:id', userCtrl.getUserAddress);

router.put('/address/:id', userCtrl.editAddress);

module.exports = router;