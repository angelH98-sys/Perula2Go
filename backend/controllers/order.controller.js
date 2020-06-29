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

orderCtrl.getEraserOrder = async (req, res) => {
    const order = await Order.find({customer: req.params.userId, status: "Borrador"});
    res.json(order[0]);
}

orderCtrl.editOrder = async (req, res) => {
    const order = {
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
    };
    await Order.findByIdAndUpdate(req.params.id, {$set: order}, {new: true});
    res.json({
        'status': "Order updated"
    });
}

module.exports = orderCtrl;