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
        borrador: Date,
        enCola: Date,
        enProceso: Date,
        lista: Date,
        enCamino: Date,
        entregada: Date
    },
    address: {
        latitude: Number,
        longitude: Number,
        direction: String,
        homeNumber: String,
        department: String,
        city: String,
        reference: String
    },
    productDetail: [{
        businessId: String,
        productId: String,
        price: Number,
        quantity: Number,
        extra: [{
            name: String,
            option: [{
                name: String,
                price: Number
            }]
        }],
        total: Number,
        status: String,
        statusDate: {
            enCola: Date,
            enProceso: Date,
            listo: Date,
        }
    }]
});

module.exports = mongoose.model('order', OrderSchema);