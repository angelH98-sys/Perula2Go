const Order = require('../models/order');

const orderCtrl = {}

orderCtrl.createOrder = (req, res) => {
    const order = new Order({
        status: req.body.status,
        comment: req.body.comment,
        totalAmount: req.body.totalAmount,
        wait: req.body.wait,
        customer: req.body.customer,
        employee: req.body.employee,
        qualification: req.body.qualification,
        orderDate: req.body.orderDate,
        address: req.body.address,
        productDetail: req.body.productDetail
    });
    order.save();
    res.json({
        'status': 'Order saved'
    });
}
/*
categoryCtrl.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
}*/

module.exports = orderCtrl;