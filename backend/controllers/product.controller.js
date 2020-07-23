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
    try{
        const product = await Product.findById(req.params.id, 'name');
        res.json(product.name);
    }catch(e){
        res.json(null);
    }
}

productCtrl.getProductInBusiness = async (req, res) => {
    try{
        const product = await Product.findOne({
            business: req.params.businessid,
            name: req.params.name}, '_id');
        res.json(product._id);
    }catch(e){
        res.json(null);
    }
}

productCtrl.getProductByBusiness = async (req, res) => {
    const products = await Product.find({business: req.params.business}, '_id name');
    res.json(products);
}

module.exports = productCtrl;