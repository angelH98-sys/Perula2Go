const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { mongoose } = require('./database');

const app = express();


/*
//////////////////////////////////////////////////////
            CONFIGURACIONES DEL SERVER
//////////////////////////////////////////////////////
*/

//Establecemos el puerto que dicta el server o, 3000 en su defecto.
app.set('port', process.env.PORT || 3000);

/*
//////////////////////////////////////////////////////
                MIDDLEWARES
//////////////////////////////////////////////////////
*/
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({origin: 'http://localhost:4200'}));//Le permitimos al servidor del frontend, comunicarse con el servidor de Mongo


/*////////////////////////////////////////////////////
                    ROUTES
/////////////////////////////////////////////////////
*/
app.use('/fileUpload', require('./imagesUploader'));
app.use('/business', require('./routes/business.routes'));
app.use('/product', require('./routes/product.routes'));
app.use('/category', require('./routes/category.routes'));
app.use('/user', require('./routes/user.routes'));
app.use('/extra', require('./routes/extra.routes'));


/*////////////////////////////////////
            STARTING THE SERVER
*/////////////////////////////////////
app.listen(app.get('port'), () => {
    console.log("Server on port ", app.get('port'));
});