const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    if (req.user) {
        console.log("logging out");
        req.logout();
        res.redirect('/');
    } else {
        console.log("else no user");
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router;