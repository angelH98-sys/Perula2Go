const mongoose = require('mongoose');

const { Schema } = mongoose;

let ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    business: String,
    picture: String,
    category: String,
    status: String,
    productionTime: Number
});

module.exports = mongoose.model('product', ProductSchema);