const Extra = require('../models/extra');

const extraCtrl = {}

extraCtrl.createExtra = (req, res) => {
    /*const extra = new Extra({
        name: req.body.name,
        price: req.body.price,
        option: req.body.option,
        product: req.body.product
    });*/
    const extraList = [];
    let extra;
    req.body.forEach(element => {
        extra = new Extra({
            name: element.name,
            option: element.option,
            status: element.status,
            product: element.product,
            multiple: element.multiple
        })
        extraList.push(extra);
    });
    Extra.insertMany(extraList).then(() => {
        res.json({
            'status': 'Extra saved'
        });
    });
    /*extra.save();
    */
}
/*
categoryCtrl.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
}
*/
module.exports = extraCtrl;