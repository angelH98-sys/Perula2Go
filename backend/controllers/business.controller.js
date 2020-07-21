const Business = require('../models/business');

const businessCtrl = {}

businessCtrl.createBusiness = async (req, res) => {
    const business = new Business({
        name: req.body.name,
        description: req.body.description,
        phone: req.body.phone,
        type: req.body.type,
        address: req.body.address,
        status: req.body.status,
        schedule: req.body.schedule,
        picture: req.body.picture,
        user: req.body.user
    });
    await business.save();
    res.json({
        'status': "Business saved"
    });
}

businessCtrl.getBusiness = async (req, res) => {
    const businesses = await Business.find();
    res.json(businesses);
}

businessCtrl.getBusinessById = async (req, res) => {
    const business = await Business.findById(req.params.id);
    res.json(business);
}

businessCtrl.checkName = async (req, res) => {
    const business = await Business.find({name: req.params.name});
    res.json({'docs': business.length});
}

businessCtrl.checkPhone = async (req, res) => {
    const business = await Business.find({phone: req.params.phone});
    res.json({'docs': business.length});
}

module.exports = businessCtrl;