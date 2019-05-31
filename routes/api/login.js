const express = require('express');
const router = express.Router();
const User = require('../../database/models/user');
const passport = require('../../passport');

router.post('/',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
      /*   console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);  */
        User.findOne({ username: req.user.username }, (err, data) => {
            if (err) {
                console.log('User.js post error: ', err)
            } else {
                res.send(data);
            }
        })
    }
)


module.exports = router;