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
        business: req.body.business,
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

orderCtrl.getOrderByBusiness = async (req, res) => {
    const orders = await Order.find({business: req.params.business}, '_id status orderDate productDetail');
    res.json(orders);
}

orderCtrl.assignBusiness = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {business: req.body.business}, {new: true});
    res.json({
        'status': 'Business assigned to order'
    });
}

orderCtrl.toOnProcess = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {status: 'En proceso'}, {new: true});
    res.json({
        'status': 'Order on process'
    });
}

orderCtrl.addProduct = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id,
        {
            totalAmount: req.body.totalAmount,
            wait: req.body.wait,
            productDetail: req.body.productDetail
        }, 
        {new: true});
    res.json({
        'status': "Product added to order"
    });
}

orderCtrl.confirmOrder = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {status: req.body.status, address: req.body.address, orderDate: req.body.orderDate}, {new: true});
    res.json({
        'status': "Order confirmed"
    });
}

orderCtrl.changeStatus = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true});
    res.json({
        'status': "Order status changed"
    });
}


module.exports = orderCtrl;