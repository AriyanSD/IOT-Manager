const express = require('express');
const dotenv = require('dotenv');
const routes = require('./Routes/Routes');
const sequelize = require('./config/database');

dotenv.config();  

const app = express();
app.use(express.json());

// const API_TOKEN = process.env.API_TOKEN; 

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; 

//     if (!token) return res.status(401).json({ error: 'Access Denied. No token provided.' });

//     if (token !== API_TOKEN) return res.status(403).json({ error: 'Invalid token.' });

//     next(); 
// }


app.use('/api', routes);

sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
});
