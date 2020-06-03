const mongoose = require('mongoose');

const { Schema } = mongoose;

let BusinessSchema = new Schema({
    name: String,
    description: String,
    phone: String,
    type: String,
    address: {
        'city': String,
        'street': String,
        'house': String,
        'reference': String
    },
    socialNetwork: {
        'Facebook': String,
        'Twitter': String,
        'Instagram': String
    },
    schedule:{
        'monday': {
            'start': Number,
            'end': Number
        },
        'tuesday':{
            'start': Number,
            'end': Number
        },
        'wednesday': {
            'start': Number,
            'end': Number
        },
        'thursday': {
            'start': Number,
            'end': Number
        },
        'friday': {
            'start': Number,
            'end': Number
        },
        'saturday':{
            'start': Number,
            'end': Number
        },
        'sunday': {
            'start': Number,
            'end': Number
        }
    },
    picture: [],
    user: [{
        'user': String,
        'role': String
    }]
});

module.exports = mongoose.model('business', BusinessSchema);