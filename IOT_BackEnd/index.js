const express = require('express');
const dotenv = require('dotenv');
const routes = require('./Routes/Routes');
const sequelize = require('./config/database');
const cors = require('cors');
const Room = require('./models/Room');
const Device = require('./models/Device');
Room.hasMany(Device, { foreignKey: 'roomId', as: 'devices' });
Device.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });

dotenv.config();  

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' 
}));
app.use('/api', routes);

sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
});
