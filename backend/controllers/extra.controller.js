const Extra = require('../models/extra');

const extraCtrl = {}

extraCtrl.createExtra = (req, res) => {
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
}

extraCtrl.getExtrasByProduct = async (req, res) => {
    const extras = await Extra.find({product: req.params.id});
    res.json(extras);
}

module.exports = extraCtrl;