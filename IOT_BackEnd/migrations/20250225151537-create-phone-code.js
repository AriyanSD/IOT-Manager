'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PhoneCodes', {
      phone_number: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      code: { 
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
    await queryInterface.dropTable('PhoneCodes');
  }
};
