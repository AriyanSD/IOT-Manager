const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Device = require('./Device');
const MailControler = require('../controllers/MailController');
const Alert = sequelize.define('Alert', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    alert_type: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    time: { type: DataTypes.TIME, defaultValue: DataTypes.NOW }
});

Alert.belongsTo(Device, { foreignKey: 'deviceId', as: 'device' });
Alert.addHook('afterCreate', async (alert, options) => {
    try {
        const device = await alert.getDevice();
        if (!device) return;

        const user = await device.getUser(); 
        if (!user || !user.email) return;


        MailControler.sendAlert(user, device);
        console.log(`Email sent to ${user.email} for alert ${alert.id}`);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }
});

module.exports = Alert;
