const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Device = require('./Device');

const Room = sequelize.define('Room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    room_name: { type: DataTypes.STRING, allowNull: false }
});

Room.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Room.belongsToMany(Device, { through: 'RoomDevices', as: 'devices' });

module.exports = Room;
