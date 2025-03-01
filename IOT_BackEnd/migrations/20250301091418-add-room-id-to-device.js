module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new column 'room_id' to the 'Device' table
    await queryInterface.addColumn('Devices', 'room_id', {
      type: Sequelize.INTEGER,
      allowNull: false,  // You can set this to true if it's optional
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the change if needed (remove the 'room_id' column)
    await queryInterface.removeColumn('Devices', 'room_id');
  },
};
