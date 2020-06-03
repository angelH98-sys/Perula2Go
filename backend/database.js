const mongoose = require('mongoose');
const URI = 'mongodb://localhost/perula2go';

mongoose.connect(URI)
.then(db => console.log("perula2go's DB is connected successfully!"))
.catch(error => console.log(error));

module.exports = mongoose;