const User = require('../models/user');
const bcrypt = require("bcrypt");

const userCtrl = {}

userCtrl.createUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        user: req.body.user,
        password: req.body.password,
        email: req.body.email,
        status: req.body.status,
        userType: req.body.userType,
        phone: req.body.phone
    });

    let errors = user.validateSync();
    
    if(errors != undefined){
        
        res.json({"error": errors, "document": undefined});
    }

    /**
     * Al encriptar la contraseña antes de enviarla a la BD, impide la validación
     * dentro del esquema.
     * 
     * Si se recibiera una contaseña vacia caería en la valiación con validateSync()
     * por ser un campo requerido. Sin embargo, si solo se ingresara una letra o
     * espacios vacios se encriptaría y ya no pudiera respetar el patrón planteado.
     * 
     * Debido a esta situación se valida de esta manera y se envía en un formáto
     * similar al que retorna MongoDB para no afectar los sub-procesos planteados
     * en el frontend.
     */
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!regex.test(user.password)){
        errors = {
            "error": {
                "errors": {
                    "password": {
                        "kind": "pattern"
                    }
                }
            }
        }

        res.json({"error": errors, "document": undefined});
    }

    const saltPass = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, saltPass);
    

    await user.save((error, document) => {
        res.json({error, document});
    });
    
}

userCtrl.editAddress = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {address: req.body}, {new: true});
    res.json({
        'status': "Address updated"
    });
}

userCtrl.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

userCtrl.checkUserById = async (req, res) => {
    let user;
    try{
        user = await User.findById(req.params.id, 'name');
    }catch(e){
        user = null;
    }
    res.json(user);
}

userCtrl.checkUserName = async (req, res) => {
    const user = await User.find({user: req.params.user});
    res.json({'docs': user.length});
}

userCtrl.checkEmail = async (req, res) => {
    const user = await User.find({email: req.params.email});
    res.json({'docs': user.length});
}

userCtrl.checkPhone = async (req, res) => {
    const user = await User.find({phone: req.params.phone});
    res.json({'docs': user.length});
}

userCtrl.getUserAddress = async (req, res) => {
    const user = await User.find({_id: req.params.id});
    res.json(user[0].address);
}

module.exports = userCtrl;