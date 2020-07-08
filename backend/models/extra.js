const mongoose = require('mongoose');

const { Schema } = mongoose;

let ExtraSchema = new Schema({
    name: String,
    option: [],
    product: String,
    multiple: Boolean
});

module.exports = mongoose.model('extra', ExtraSchema);