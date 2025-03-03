const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Room = require('./Room');

const Device = sequelize.define('Device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    device_name: { type: DataTypes.STRING, allowNull: false },
    device_type: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    status: {  
        type: DataTypes.ENUM('offline', 'Online', 'stand_by'), 
        allowNull: false 
    },
    data: { type: DataTypes.FLOAT, allowNull: true },
    data_type: { type: DataTypes.STRING, allowNull: true },
    device_token: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true }
});

Device.belongsTo(User, { foreignKey: 'userId', as: 'user' }); 
//Device.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });
module.exports = Device;
