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
        productionTime: req.body.productionTime
    });
    product.save();
    res.json({
        'status': 'Product saved'
    });
}

productCtrl.getProduct = async (req, res) => {
    const products = await Product.find({business: req.params.id});
    res.json(products);
}

productCtrl.getProductById = async (req, res) => {
    const productName = await Product.findById(req.params.id, 'name');
    res.json(productName);
}

productCtrl.getProductName = async (req, res) => {
    const product = await Product.find({_id: req.params.id});
    res.json(product[0].name);
}

productCtrl.getProductByBusiness = async (req, res) => {
    const products = await Product.find({business: req.params.business}, '_id name');
    res.json(products);
}

module.exports = productCtrl;