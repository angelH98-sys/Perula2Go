const Category = require('../models/category');

const categoryCtrl = {}

categoryCtrl.createCategory = (req, res) => {
    const category = new Category({
        name: req.body.name
    });
    category.save();
    res.json({
        'status': 'Category saved',
        'body': req.body
    });
}

categoryCtrl.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
}

module.exports = categoryCtrl;