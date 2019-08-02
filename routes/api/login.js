const express = require('express');
const jwt = require('jsonwebtoken');
const User = require("../../database/models/user");
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { body } = req;
  const { username } = body;
  const { password } = body;

  console.log(username);
  //checking to make sure the user entered the correct username/password combo
  User.findOne({ username: username }).then(user => {
    if (!user) {
      console.log('not found');
      return res.status(404).json({ usernamenotfound: "username not found" });
    }

    var result = bcrypt.compareSync(password, user.password);

    if (result) {
      //if user log in success, generate a JWT token for the user with a secret key
      jwt.sign({ user }, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) { console.log(err) }
        res.json({
          token: token,
        });
      });
    }

  })
});

module.exports = router;