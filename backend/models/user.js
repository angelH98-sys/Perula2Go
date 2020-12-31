const mongoose = require('mongoose');

const { Schema } = mongoose;

let UserSchema = new Schema({
    name: String,
    user: String,
    password: String,
    email: String,
    status: String,
    userType: String,
    phone: String
});

module.exports = mongoose.model('user', UserSchema);