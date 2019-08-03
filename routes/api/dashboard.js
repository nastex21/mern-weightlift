const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  console.log('headers');
  console.log(req.headers);
  const header = req.headers['authorization'];

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    req.token = token;
    console.log(req.token == token);
    console.log("req.token");
    console.log(req.token);
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403)
  }
}

router.get('/', checkToken, (req, res, next) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, process.env.SECRET, (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else { 
      //If token is successfully verified, we can send the autorized data 
      console.log('authorizedData');
      console.log(authorizedData);
      res.json({
        message: 'Successful log in',
        authorizedData
      });
      console.log('SUCCESS: Connected to protected route');
    }
  })
});

module.exports = router;