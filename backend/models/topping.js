const mongoose = require('mongoose');

const { Schema } = mongoose;

let ToppingSchema = new Schema({
    name: String,
    price: Number,
    picture: String,
    status: String,
    meal: []
});

module.exports = mongoose.model('topping', ToppingSchema);