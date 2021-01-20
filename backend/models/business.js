const mongoose = require('mongoose');

const { Schema } = mongoose;

let BusinessSchema = new Schema({
    name: String,
    description: String,
    phone: String,
    type: String,
    address: Object,
    status: String,
    schedule: [],
    /**
     * El array tendría almacenados 7 elementos (simulando los días de la semana)
     * Cada item contendría el siguiente objeto:
     * {
     *  open    -> indicando si el negocio esta abierto ese día
     *  start   -> indicando la hora de apertura
     *  end     -> indicando la hora de clausura
     * }
     */
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