const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.post('/', userCtrl.createUser);

router.get('/:email', userCtrl.getUserByEmail);

module.exports = router;