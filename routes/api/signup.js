const express = require('express');
const router = express.Router();
const User = require('../../database/models/user');
const bcrypt = require('bcryptjs');

router.post('/', (req, res) => {

    const { username, password} = req.body
    console.log('signup');
    console.log(username);
    console.log(password);
    User.findOne({ username: username  }).then(user => {
        if (user) {
          return res.status(400).json({ username: "Username already exists" });
        } else {
          const newUser = new User({
            username: username,
            password: password
          });
    // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
});

module.exports = router;