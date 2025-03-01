const  Device  = require('../models/Device'); 

const checkDevice = async (req, res, next) => {
    try {
        const deviceToken = req.headers['device-token']; 
        console.log(deviceToken);
        if (!deviceToken) {
            return res.status(400).json({ error: "Device token is required." });
        }


        const device = await Device.findOne({ where: { device_token: deviceToken } });

        if (!device) {
            return res.status(404).json({ error: "Device not found." });
        }

       
        req.device = device;
        next(); 
    } catch (error) {
        console.error('Error checking device:', error.message);
        return res.status(500).json({ error: "Server error" });
    }
};

module.exports = checkDevice;
