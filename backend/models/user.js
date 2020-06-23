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
    address: [{
        'latitude': Number,
        'longitude': Number,
        'reference': String
    }],
    employee: {
        'vehicle': String,
        'dui': String,
        'driverLicense': String,
        'status': String,
        'qualification': Number
    }
});

module.exports = mongoose.model('user', UserSchema);