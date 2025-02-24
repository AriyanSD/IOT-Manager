const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false ,
        validate:{
            isValidEmail(value){
                if(value){
                    if(!validator.isEmail(value,'any')){
                        throw new Error('Invalid email');
                    }
                }
            }
        }
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isValidPhone(value) {
                if (!validator.isMobilePhone(value, 'any')) {
                    throw new Error('Invalid phone number');
                }
            }
    },
    password: { type: DataTypes.STRING, allowNull: false },
    user_type: {
        type: DataTypes.ENUM('individual', 'corporate'),
        allowNull: false
    }
}, 
    

verifiedNumber:{type: DataTypes.BOOLEAN, defaultValue: false},
verifiedEmail:{type: DataTypes.BOOLEAN, defaultValue: false},
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
        }
    }
});

module.exports = User;
