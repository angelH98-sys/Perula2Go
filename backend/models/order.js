const mongoose = require('mongoose');

const { Schema } = mongoose;

let OrderSchema = new Schema({
    status: String,
    comment: String,
    totalAmount: Number,
    totalWait: Number,
    customer: String,
    employee: String,
    qualification: Number,
    orderDate: Date,
    address: {
        'city': String,
        'street': String,
        'house': String,
        'reference': String
    },
    productDetail: [{
        'product': String,
        'extra': []
    }]
});

module.exports = mongoose.model('order', OrderSchema);