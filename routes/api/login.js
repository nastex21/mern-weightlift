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
  User.findOne({ username: username }, function (err, user) {
    if (!user) {
      return res.status(401).json({
        msg: "Incorrect username and/or password."
      })
    }

    var result = bcrypt.compareSync(password, user.password);

    if (result) {
      //if user log in success, generate a JWT token for the user with a secret key
      const token = jwt.sign({ user }, process.env.SECRET);

      return res.status(200).send({
        data: user,
        token: token
      })
    } else {
      return res.status(401).json({
        msg: "Incorrect username and/or password."
      })
    }
  })
});

module.exports = router;