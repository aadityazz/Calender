const db = require('../db'); // Your MySQL database connection

module.exports = db.sequelize.define('users', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    },
});
