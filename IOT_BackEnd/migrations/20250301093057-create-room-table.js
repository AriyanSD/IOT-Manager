module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Rooms', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      room_name: { type: Sequelize.STRING, allowNull: false },
      userId: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {
          model: 'Users', // Name of the Users table
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Rooms');
  },
};
