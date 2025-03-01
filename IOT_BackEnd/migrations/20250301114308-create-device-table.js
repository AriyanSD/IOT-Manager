module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Devices', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      device_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      device_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('offline', 'online', 'stand_by'),
        allowNull: false,
      },
      data: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      data_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      device_token: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Make sure this matches the name of your User table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      roomId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Rooms', // Make sure this matches the name of your Rooms table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Devices');
  },
};
