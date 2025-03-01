'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Devices', 'roomId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Rooms', 
        key: 'id',
      },
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Devices', 'roomId');
  },
};
