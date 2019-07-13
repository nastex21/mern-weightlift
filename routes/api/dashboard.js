const express = require('express');
const router = express.Router();
const User = require('../../database/models/user');

router.post('/', (req, res) => {

    const { username, password, logs } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, there's already a user with the username: ${username}`
            })
        } else {
            const newUser = new User({
                username: username,
                password: password,
                logs: logs
            })
            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    })
});

router.get('/', (req, res, next) => {
    console.log('===== user triggered!!======')
    if (req.isAuthenticated()) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }

});

module.exports = router