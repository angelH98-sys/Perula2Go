const Product = require('../models/product');

const productCtrl = {}

productCtrl.createProduct = (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        business: req.body.business,
        picture: req.body.picture,
        category: req.body.category,
        status: req.body.status,
        productionTime: req.body.productionTime,
        combo: req.body.combo,
        size: req.body.size
    });
    product.save();
    res.json({
        'status': 'Product saved'
    });
}

module.exports = productCtrl;