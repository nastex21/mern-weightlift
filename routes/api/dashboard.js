const express = require('express');
const router = express.Router();
const User = require('../../database/models/user');
const bcrypt = require('bcryptjs');

router.get('/', (req, res, next) => {
    console.log('===== user triggered!!======')
    if (req.isAuthenticated()) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }

});

module.exports = router;