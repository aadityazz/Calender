const db = require('../db'); // Your MySQL database connection

module.exports = db.sequelize.define('slots', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
});
