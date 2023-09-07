const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const User = require('../Model/user'); // Adjust the model path as needed

// User signup route
router.post('/signup', (req, res) => {
    const { firstname, lastname, stateName, email, password, mobile, city, branch, isAdmin, isVoted } = req.body;

    if (!email || !password || !firstname || !mobile || !city || !branch) {
        return res.status(422).json({ error: 'Please add all the fields' });
    }

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                username,
                email,
                password: hashedPassword,
                isAdmin
            });

            user.save()
                .then(user => {
                    res.json({ message: 'Saved successfully' });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: 'Error saving user' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Error hashing password' });
        });
});

// User signin route
router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: 'Please add email or password' });
    }

    User.findOne({ where: { email } })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: 'Invalid Email or password' });
            }

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser.id }, JWT_SECRET);
                        const { id, firstname, lastname, stateName, email,  mobile, city, branch, isAdmin } = savedUser;
                        res.json({ token, user: { id, firstname, lastname, stateName, email, mobile, city, branch, isAdmin } });
                    } else {
                        return res.status(422).json({ error: 'Invalid Email or password' });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: 'Error comparing passwords' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Error fetching user data' });
        });
});

module.exports = router;
