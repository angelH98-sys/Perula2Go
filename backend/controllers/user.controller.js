const User = require('../models/user');

const userCtrl = {}

userCtrl.createUser = (req, res) => {
    const user = new User({
        name: req.body.name,
        user: req.body.user,
        password: req.body.password,
        email: req.body.email,
        question: req.body.question,
        answer: req.body.answer,
        picture: req.body.picture,
        status: req.body.status,
        userType: req.body.userType,
        phone: req.body.phone,
        address: req.body.address,
        employee: req.body.employee
    });
    user.save((err, newUser) => {
        res.json({
            '_id': newUser._id
        });
    });
}

userCtrl.editAddress = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {address: req.body}, {new: true});
    res.json({
        'status': "Address updated"
    });
}

userCtrl.getUserById = async (req, res) => {
    const user = await User.find({_id: req.params.id});
    res.json(user[0]);
}

userCtrl.getUserAddress = async (req, res) => {
    const user = await User.find({_id: req.params.id});
    res.json(user[0].address);
}

module.exports = userCtrl;