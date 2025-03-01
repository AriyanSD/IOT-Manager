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
exports.updateDevice = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; 

        const device = await Device.findByPk(id);
        if (!device) {
            return res.status(404).json({ error: 'Device not found' });
        }
        await device.update(updateData);
        return res.status(200).json({ message: 'Device updated successfully', device });
    } catch (error) {
        console.error(error);s
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getDevicesByRoom = async (req, res) => {
    async (req, res) => {
        try {
            const { roomId } = req.params;
                const room = await Room.findByPk(roomId, {
                include: { model: Device, as: "devices" },
            });
    
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }
    
            res.json(room.devices);
        } catch (error) {
            console.error("Error fetching devices:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
}
}

exports.deleteDevice = async (req, res) => {
    try {
        const { id } = req.params; 

        const device = await Device.findByPk(id); 
        if (!device) {
            return res.status(404).json({ error: 'Device not found' }); 
        }

        await device.destroy(); 

        return res.status(200).json({ message: 'Device deleted successfully' }); 
    } catch (err) {
        console.error("Error deleting device:", err); 
        return res.status(500).json({ error: 'Internal Server Error' }); // Return 500 for internal server error
    }
};
