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
    //If header is undefined return Forbidden (403)
    res.sendStatus(403)
  }
}

router.get('/', checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {

    if (err) {
      //If error send Forbidden (403)
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
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
      console.log('SUCCESS: Connected to protected route');
    }
  })
});

module.exports = router;