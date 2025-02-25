'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Alerts', {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      alert_type: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      message: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      time: { 
        type: Sequelize.TIME, 
        defaultValue: Sequelize.NOW 
      },
      deviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Devices',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Alerts');
  }
};
