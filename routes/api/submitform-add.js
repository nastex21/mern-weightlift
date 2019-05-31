const express = require('express');
const router = express.Router();
const passport = require('../../passport');


router.post('/add', (req, res) => {
    console.log(req.body)
})


module.exports = router;