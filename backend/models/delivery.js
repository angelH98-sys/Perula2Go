const mongoose = require('mongoose');

const { Schema } = mongoose;

let DeliverySchema = new Schema({
    order: [],
    employee: [],
    start: Date,
    end: Date,
    comment: Date
});

module.exports = mongoose.model('delivery', DeliverySchema);