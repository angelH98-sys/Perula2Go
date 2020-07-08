const mongoose = require('mongoose');

const { Schema } = mongoose;

let OrderSchema = new Schema({
    status: String,
    comment: String,
    totalAmount: Number,
    wait: Number,
    customer: String,
    employee: String,
    business: String,
    qualification: Number,
    statusDate: {
        'borrador': Date,
        'enCola': Date,
        'enProceso': Date,
        'lista': Date,
        'enCamino': Date,
        'entregada': Date
    },
    address: {},
    productDetail: []
});

module.exports = mongoose.model('order', OrderSchema);