const Room= require('../models/Room');
exports.AddRoom= async (req, res) => {
    try {
        const { room_name } = req.body;
        const userId = req.user.id; 
        if (!room_name || !userId) {
            return res.status(400).json({ error: 'Room name and user ID are required.' });
        }

        const newRoom = await Room.create({
            room_name,  
            userId,   
        });

        res.status(201).json(newRoom);
    } catch (err) {
        console.error('Error adding new room:', err);
        res.status(500).json({ error: 'Error adding new room.' });
    }}