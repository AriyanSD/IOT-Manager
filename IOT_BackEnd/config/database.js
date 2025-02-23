const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

sequelize.authenticate()
    .then(() => console.log('SQLite Database connected...'))
    .catch(err => console.error('Error:', err));

module.exports = sequelize;
