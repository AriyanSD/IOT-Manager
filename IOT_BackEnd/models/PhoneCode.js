const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PhoneCode = sequelize.define('PhoneCode', {
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'phone_codes',
    timestamps: false,
});

module.exports = PhoneCode;
