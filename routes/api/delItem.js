const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");

router.post('/', (req, res) => {
console.log('delitems');
    console.log(req.body);

});

module.exports = router;