'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Devices', 'roomId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Rooms',  // The table name of the Room model
        key: 'id',       // The primary key in the Room table
      },
      allowNull: false, // Set as true if you want to allow nulls
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Devices', 'roomId');
  }
};
