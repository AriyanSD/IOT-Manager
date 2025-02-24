const Device = require('../models/Device');

exports.getDevices = async (req, res) => {
    try {
        let query = { userId: req.user.id };

        if (req.query.search_name) query.device_name = { [Op.iLike]: `%${req.query.search_name}%` };
        if (req.query.filter_status) query.status = req.query.filter_status;
        if (req.query.filter_type) query.device_type = req.query.filter_type;

        const devices = await Device.findAll({ where: query });
        res.json(devices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createDevice = async (req, res) => {
    try {
        const newDevice = await Device.create({ ...req.body, userId: req.user.id });
        res.status(201).json(newDevice);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
