const mongoose = require('mongoose');

const { Schema } = mongoose;

let ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    business: String,
    picture: String,
    category: [],
    status: String,
    productionTime: String,
    combo: [],
    size: [{
        'name': String,
        'price': Number
    }]
});

module.exports = mongoose.model('product', ProductSchema);