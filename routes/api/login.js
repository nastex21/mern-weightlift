const express = require('express');
const router = express.Router();
const User = require('../../database/models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
    console.log("req in login");
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
  // Find user by username
    User.findOne({ username: req.body.username }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ usernamenotfound: "username not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            process.env.SECRET,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });



module.exports = router;