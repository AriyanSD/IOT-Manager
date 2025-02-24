const User = require('../models/User');

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; 
        const user = await User.findByPk(id);
        res.json(alerts);
        if (!user) {
            return res.status(404).json({ error: 'Device not found' });
        }
        await user.update(updateData);
        return res.status(200).json({ message: 'Device updated successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};