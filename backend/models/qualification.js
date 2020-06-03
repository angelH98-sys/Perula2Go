const mongoose = require('mongoose');

const { Schema } = mongoose;

let QualificationSchema = new Schema({
    order: Number,
    productComment: {
        'comment': String,
        'stars': String
    },
    employeeComment: {
        'comment': String,
        'stars': String
    }
});

module.exports = mongoose.model('qualification', QualificationSchema);