const express = require('express');
const morgan = require('morgan');

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

/*////////////////////////////////////////////////////
                    ROUTES
/////////////////////////////////////////////////////
*/
app.get('/')