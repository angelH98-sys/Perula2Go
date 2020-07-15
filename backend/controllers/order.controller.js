const Order = require('../models/order');

const orderCtrl = {}

orderCtrl.createOrder = async (req, res) => {
    const order = new Order({
        status: req.body.status,
        comment: req.body.comment,
        totalAmount: req.body.totalAmount,
        wait: req.body.wait,
        customer: req.body.customer,
        employee: req.body.employee,
        business: req.body.business,
        qualification: req.body.qualification,
        statusDate: req.body.statusDate,
        address: req.body.address,
        productDetail: req.body.productDetail
    });
    await order.save();
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

orderCtrl.getStatusDate = async (req, res) => {
    const dates = await Order.findById(req.params.id, 'statusDate');
    res.json(dates);
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
    let order = req.body.order;
    await Order.findByIdAndUpdate(req.params.id,{
        status: order.status,
        address: order.address,
        statusDate: order.statusDate
    }, {new: true});
    res.json({
        'status': "Order confirmed"
    });
}

orderCtrl.updateAndConfirmOrder = async (req, res) => {
    let order = req.body.order;
    await Order.findByIdAndUpdate(req.params.id,{
        status: order.status,
        address: order.address,
        statusDate: order.statusDate,
        totalAmount: order.totalAmount,
        productDetail: order.productDetail
    }, {new: true});
    res.json({
        'status': "Order confirmed"
    });
}

orderCtrl.changeStatus = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {status: req.body.status, statusDate: req.body.statusDate}, {new: true});
    res.json({
        'status': "Order status changed"
    });
}


module.exports = orderCtrl;