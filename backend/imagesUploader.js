const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const router = express.Router();

function upload(type){
    data = multer({ 
        storage: multer.diskStorage({
            destination: (req, file, callBack) => {
                callBack(null, 'frontend/src/assets/' + type)
            },
            filename: (req, file, callBack) => {
                callBack(null, uuid.v4() + path.extname(file.originalname))
            }
        }) 
    })
    return data;
}

router.post('/business', upload('business').single('image'), (req, res, next) => {
    res.send({
        'image' : req.file.filename
    });
});

router.post('/product', upload('product').single('image'), (req, res, next) => {
    res.send({
        'image' : req.file.filename
    });
});

module.exports = router;