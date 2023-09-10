const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./db'); // Import sequelize instance from db.js
const PORT =  5000;

// Middleware
app.use(cors({ credentials: true, origin: 'https://calendar-get-me-therapy.netlify.app' }));
//app.use(cors());
app.use(bodyParser.json());

// Import models
const User = require('./Model/user');
const Slot = require('./Model/slots')

// Routes
app.use('/api/auth', require('./Route/auth'));
app.use('/api/slot', require('./Route/slots'))
//app.use('/api/order', require('./Route/order'));

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
