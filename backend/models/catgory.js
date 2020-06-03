const mongoose = require('mongoose');

const { Schema } = mongoose;

let CategorySchema = new Schema({
    name: String
});

module.exports = mongoose.model('category', CategorySchema);