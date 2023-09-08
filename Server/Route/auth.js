const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const Auth = require('../Model/user'); // Adjust the model path as needed

// Auth signup route
router.post('/signup', (req, res) => {
    const { username, email, password, isAdmin, } = req.body;

    console.log(req.body);

    if (!email || !password || !username) {
        return res.status(422).json({ error: 'Please add all the fields' });
    }

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new Auth({
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


// Auth signin route
router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: 'Please add email or password' });
    }

    Auth.findOne({where:{email}})
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: 'Invalid Email or password' });
            }

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser.id }, JWT_SECRET);
                        const { id, username, email, isAdmin } = savedUser;
                        console.log(62);
                        res.status(200).json({ token, user: { id, username, email, isAdmin } }); // Send a 200 OK response with the token and user info
                    } else {
                        return res.status(422).json({ error: 'Invalid Email or password' });
                    }
                })
                .catch(err => {
                    console.log(err);
                    console.log(70);
                    res.status(500).json({ error: 'Error comparing passwords' });
                });
        })
        .catch(err => {
            console.log(err);
            console.log(76);
            res.status(500).json({ error: 'Error fetching user data' });
        });
});


module.exports = router;
