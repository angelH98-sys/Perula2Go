const mongoose = require('mongoose');

const { Schema } = mongoose;

let EmployeeSchema = new Schema({
    user: String,
    vehicleID: String,
    phone: String,
    status: String,
    qualification: Number,
    document: {
        'dui': String,
        'driverLicense': String
    }
     
});

module.exports = mongoose.model('employee', EmployeeSchema);