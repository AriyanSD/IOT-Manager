const User = require('../models/User');
const Room = require('../models/Room');
const Device = require('../models/Device');
exports.updateUser = async (req, res) => {
    try {
        const updateData = req.body; 
        const user = await User.findByPk(req.user.id); 

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.update(updateData);
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id); 
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


exports.getRules = async (req, res) => {    
    res.status(200).json(['individual', 'corporate']);
}

exports.getUserRooms = async (req, res) => {
    try {
        const userId  = req.user.id;

        const rooms = await Room.findAll({
            where: { userId }, 
            include: { model: Device, as: "devices" } 
        });

        if (!rooms.length) {
            return res.status(404).json({ message: "No rooms found for this user" });
        }

        res.json(rooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};