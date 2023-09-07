const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const db = require('../db'); // Your MySQL database connection

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'You must be logged in' });
    }

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: 'You must be logged in' });
        }

        const { _id } = payload;

        const User = require('../Model/user'); // Adjust the model path as needed

        User.findByPk(_id)
            .then(userdata => {
                req.user = userdata;
                next();
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error fetching user data' });
            });
    });
};
