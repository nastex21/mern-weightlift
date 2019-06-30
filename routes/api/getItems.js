const express = require('express');
const router = express.Router();
const User = require('../../database/models/user');

router.get('/user/:id/date/:date', (req, res) => {
    console.log("getItem")
    console.log(req.params);
});

module.exports = router;