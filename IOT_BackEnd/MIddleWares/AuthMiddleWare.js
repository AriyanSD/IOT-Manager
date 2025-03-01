const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        console.log("Not Found or what",token)
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
