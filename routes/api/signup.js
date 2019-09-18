const express = require('express');
const User = require('../../database/models/user');
const router = express.Router();

router.post('/', (req, res) => {

  const { username, password } = req.body
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      res.json(err);
    } else if (user) {
      res.json({
        error: "Sorry, username is already taken."
      })
    } else {
      const newUser = new User({
        username: username,
        password: password
      })
      newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        res.json(savedUser)
      })
    }
  })
});

module.exports = router;