const mongoose = require('mongoose');

const { Schema } = mongoose;

let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: e => {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e);
            },
            type: "pattern",
            message: "Formato erróneo"
        }
    },
    status: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
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
    }
});

module.exports = mongoose.model('user', UserSchema);