const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmailToken = sequelize.define('EmailToken', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
}, {
    tableName: 'email_tokens',
    timestamps: false,
});

module.exports = EmailToken;
