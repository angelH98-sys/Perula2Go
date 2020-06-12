const Business = require('../models/business');

const businessCtrl = {}

businessCtrl.createBusiness = (req, res) => {
    const business = new Business({
        name: req.body.name,
        description: req.body.description,
        phone: req.body.phone,
        type: req.body.type,
        address: req.body.address,
        schedule: req.body.schedule,
        picture: req.body.picture,
        user: req.body.user
    });
    business.save();
    res.json({
        'status': "Business saved"
    });
}

businessCtrl.getBusiness = async (req, res) => {
    const businesses = await Business.find();
    res.json(businesses);
}

module.exports = businessCtrl;