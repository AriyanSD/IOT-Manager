const User = require('../models/User');

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; 
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update(updateData);
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getRules = async (req, res) => {    
    res.status(200).json(['individual', 'corporate']);
}