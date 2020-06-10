const express = require('express');

const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const router = express.Router();

const businessCtrl = require('../controllers/business.controller');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'frontend/src/assets/business')
  },
  filename: (req, file, callBack) => {
      callBack(null, uuid.v4() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })


router.post('/', businessCtrl.createBusiness);

router.post('/file/cover', upload.single('cover'), (req, res, next) => {
  res.send({
    'image' : req.file.filename
  });
});

router.post('/file/logo', upload.single('logo'), (req, res, next) => {
  res.send({
    'image': req.file.filename
  });
});


module.exports = router;