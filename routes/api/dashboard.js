const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");
const jwt = require('jsonwebtoken');

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    next();
  } else {

    res.sendStatus(403)
  }
}

router.get('/', checkToken, (req, res) => {
  console.log('router get')
  //verify the JWT token generated for the user
      User.findById(req.query.id ).then(user => {
        if (!user) {
          console.log('not found');
          return res.status(404).json({ usernamenotfound: "username not found" });
        }

        if (user) {
          //if user log in success, generate a JWT token for the user with a secret key
          console.log(user);
          res.json(user);
        }

      })
    }
)

module.exports = router;