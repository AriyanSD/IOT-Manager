'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      username: { 
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false 
      },
      email: { 
        type: Sequelize.STRING, 
        unique: true, 
        allowNull: false 
      },
      phone_number: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true 
      },
      password: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      user_type: { 
        type: Sequelize.ENUM('individual', 'corporate'), 
        allowNull: false 
      },
      verifiedNumber: { 
        type: Sequelize.BOOLEAN, 
        defaultValue: false 
      },
      verifiedEmail: { 
        type: Sequelize.BOOLEAN, 
        defaultValue: false 
      },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
