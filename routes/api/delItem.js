const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    console.log('headers');
    console.log(req.headers);
    const header = req.headers['authorization'];
  
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
  
      req.token = token;
      console.log("req.token");
      console.log(req.token);
      next();
    } else {
      //If header is undefined return Forbidden (403)
      res.sendStatus(403)
    }
  }

router.delete('/:color/itemid/:item/user/:id', checkToken, (req, res, next) => {
    console.log('delitems');
    console.log(req.params);
    var typeExercise = '';

    req.params.color == "red" ? typeExercise = "logs" : req.params.color == "blue" ? typeExercise = 'cardiologs' : req.params.color == "black" ? typeExercise = "vidslogs" : req.params.color == "green" ? typeExercise = "bwlogs" : undefined;

    if (typeExercise == 'logs') {
        User.findOneAndUpdate({ "_id": req.params.id }, { $pull: { "logs.$[].collections": { "_id": req.params.item } } }, function (err, data) {
            if (err) {
                console.log(err)
            }
            console.log("200");
            console.log(data)
        })
    }

    if (typeExercise == 'cardiologs') {
        User.findOneAndUpdate({ "_id": req.params.id }, { $pull: { "cardiologs.$[].collections": { "_id": req.params.item } } }, function (err, data) {
            if (err) {
                console.log(err)
            }
            console.log("200");
            console.log(data)
        })
    }

    if (typeExercise == 'vidslogs') {
        User.findOneAndUpdate({ "_id": req.params.id }, { $pull: { "vidslogs.$[].collections": { "_id": req.params.item } } }, function (err, data) {
            if (err) {
                console.log(err)
            }
            console.log("200");
            console.log(data)
        })
    }

    if (typeExercise == 'bwlogs') {
        User.findOneAndUpdate({ "_id": req.params.id }, { $pull: { "bwlogs.$[].collections": { "_id": req.params.item } } }, function (err, data) {
            if (err) {
                console.log(err)
            }
            console.log("200");
            console.log(data)
        })
    }


});


module.exports = router;