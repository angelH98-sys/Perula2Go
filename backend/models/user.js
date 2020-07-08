const mongoose = require('mongoose');

const { Schema } = mongoose;

let UserSchema = new Schema({
    name: String,
    user: String,
    password: String,
    email: String,
    question: String,
    answer: String,
    picture: String,
    status: String,
    userType: String,
    phone: String,
    address: [],
    employee: Object
});

module.exports = mongoose.model('user', UserSchema);