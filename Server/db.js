const Sequelize = require('sequelize');

const sequelize = new Sequelize('calendar', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});


// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL database');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = { sequelize, Sequelize };
