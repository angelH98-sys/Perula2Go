const mongoose = require('mongoose');

const { Schema } = mongoose;

let CustomerSchema = new Schema({
    user: String,
    phone: String,
    address: [{
        'city': String,
        'street': String,
        'house': String,
        'reference': String
    }]
});

module.exports = mongoose.model('customer', CustomerSchema);