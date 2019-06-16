const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");

router.post('/', (req, res) => {
console.log('delitems');
    console.log(req);

});

module.exports = router;