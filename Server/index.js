const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./db'); // Import sequelize instance from db.js
const PORT =  5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import models
const User = require('./Model/user');

// Routes
app.use('/api/auth', require('./Route/auth'));

// Start server
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error starting the server:', error);
    });
