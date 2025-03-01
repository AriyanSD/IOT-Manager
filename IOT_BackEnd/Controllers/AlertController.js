const Alert = require('../models/Alert');
const Device = require('../models/Device');

exports.getAlerts = async (req, res) => {
    try {
        const userDevices = await Device.findAll({ where: { userId: req.user.id } });
        const deviceIds = userDevices.map(d => d.id);

        let query = { deviceId: deviceIds };

        // Filters
        if (req.query.search_message) query.message = { [Op.iLike]: `%${req.query.search_message}%` };
        if (req.query.search_device) query.deviceName = { [Op.iLike]: `%${req.query.search_device}%` };
        if (req.query.filter_type) query.alert_type = req.query.filter_type;
        if (req.query.order) query.order = [['time', req.query.order]];

        const alerts = await Alert.findAll({ where: query });
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAlert = async (req, res) => {
    try {
        const newAlert = await Alert.create(req.body);
        res.status(201).json(newAlert);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAlertsByDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const userDevice = await Device.findOne({ where: { id: deviceId, userId: req.user.id } });
        if (!userDevice) {
            return res.status(403).json({ error: "Access denied: Device not found" });
        }

        let query = { deviceId };

        if (req.query.search_message) query.message = { [Op.iLike]: `%${req.query.search_message}%` };
        if (req.query.filter_type) query.alert_type = req.query.filter_type;
        if (req.query.order) query.order = [['time', req.query.order]];

        const alerts = await Alert.findAll({ where: query });
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
