const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.post('/', userCtrl.createUser);

router.get('/:id', userCtrl.getUserById);

router.get('/checkuser/:user', userCtrl.checkUserName);

router.get('/checkemail/:email', userCtrl.checkEmail);

router.get('/checkphone/:phone', userCtrl.checkPhone);

router.get('/address/:id', userCtrl.getUserAddress);

router.put('/address/:id', userCtrl.editAddress);

module.exports = router;