const mongoose = require('mongoose');

const { Schema } = mongoose;

let ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    business: String,
    picture: [],
    category: [],
    status: String
});

module.exports = mongoose.model('product', ProductSchema);