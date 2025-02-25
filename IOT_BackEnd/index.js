const express = require('express');
const dotenv = require('dotenv');
const routes = require('./Routes/Routes');
const sequelize = require('./config/database');

dotenv.config();  

const app = express();
app.use(express.json());
app.use('/api', routes);

sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
});
