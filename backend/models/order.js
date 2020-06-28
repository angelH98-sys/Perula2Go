const mongoose = require('mongoose');

const { Schema } = mongoose;

let OrderSchema = new Schema({
    status: String,
    comment: String,
    totalAmount: Number,
    wait: Number,
    customer: String,
    employee: String,
    qualification: Number,
    orderDate: Date,
    address: {
        'latitude': Number,
        'longitude': Number,
        'reference': String
    },
    productDetail: [{
        'product': String,
        'extra': [{
            'name': String,
            'price': Number
        }]
    }]
});

module.exports = mongoose.model('order', OrderSchema);