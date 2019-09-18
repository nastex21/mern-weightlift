const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    if (req.user) {
        req.logout();
        res.redirect('/'); 
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router;