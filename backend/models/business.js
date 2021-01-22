const mongoose = require('mongoose');
const { stringify } = require('uuid');

const { Schema } = mongoose;

let BusinessSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    phone: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: p => {
                return /^[6-7]\d{3}-\d{4}$/.test(p);
            },
            message: "Formato erróneo",
            type: "pattern"
        }
    },
    type: {
        type: String,
        required: true
    },
    address: {
        latitude: Number,
        longitude: Number,
        direction: String,
        homeNumber: String,
        department: String,
        city: String,
        reference: String
    },
    status: {
        type: String,
        required: true
    },
    schedule: [{
        isOpen: Boolean,
        start: Date,
        end: Date
    }],
    picture: {
        'cover': String,
        'logo': String
    },
    user: [{
        'userId': String,
        'role': String
    }]
});

module.exports = mongoose.model('business', BusinessSchema);