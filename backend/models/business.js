const mongoose = require('mongoose');

const { Schema } = mongoose;

let BusinessSchema = new Schema({
    name: String,
    description: String,
    phone: String,
    type: String,
    address: Object,
    status: String,
    schedule:{
        'monday': {
            'start': String,
            'end': String
        },
        'tuesday':{
            'start': String,
            'end': String
        },
        'wednesday': {
            'start': String,
            'end': String
        },
        'thursday': {
            'start': String,
            'end': String
        },
        'friday': {
            'start': String,
            'end': String
        },
        'saturday':{
            'start': String,
            'end': String
        },
        'sunday': {
            'start': String,
            'end': String
        }
    },
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