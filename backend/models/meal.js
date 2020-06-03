const mongoose = require('mongoose');

const { Schema } = mongoose;

let MealSchema = new Schema({
    product: String,
    calories: Number,
    productionTime: Number,
    combo: []
});

module.exports = mongoose.model('meal', MealSchema);