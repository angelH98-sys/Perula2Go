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
        picure: req.body.picture,
        status: req.body.status,
        userType: req.body.userType,
        phone: req.body.phone,
        address: req.body.address,
        employee: req.body.employee
    });
    user.save();
    res.json({
        'status': 'User saved'
    });
}

/*categoryCtrl.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
}*/

module.exports = userCtrl;