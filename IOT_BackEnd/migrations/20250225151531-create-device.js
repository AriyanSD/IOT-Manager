'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Devices', {
      id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      device_name: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      device_type: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      location: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      status: {  
        type: Sequelize.ENUM('offline', 'Online', 'stand_by'), 
        allowNull: false 
      },
      data: { 
        type: Sequelize.FLOAT, 
        allowNull: true 
      },
      data_type: { 
        type: Sequelize.STRING, 
        allowNull: true 
      },
      device_token: { 
        type: Sequelize.UUID, 
        defaultValue: Sequelize.UUIDV4, 
        unique: true 
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
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
    await queryInterface.dropTable('Devices');
  }
};
