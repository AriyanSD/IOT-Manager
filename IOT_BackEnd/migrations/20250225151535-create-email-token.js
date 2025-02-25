'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EmailTokens', {
      email: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      token: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      createdAt: { 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW 
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('EmailTokens');
  }
};
