const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");

router.delete('/:color/itemid/:item/user/:id', (req, res, next) => {
    console.log('delitems');
    console.log(req.params);
    var typeExercise = '';
    req.params.color == "red" ? typeExercise = "logs" : req.params.color == "blue" ? typeExercise = 'cardiologs' : req.params.color == "black" ? typeExercise = "vidslogs" : req.params.color == "green" ? typeExercise = "bwlogs" : undefined;

    console.log(typeExercise);
    console.log(req.params.color);
    console.log(req.params.item == "254eff03-3869-4915-a18d-b661ed8f844d");
    console.log(req.params.id == "5d09429baefd1a170ce7d9cc");

    //{awards: {$elemMatch: {award:'National Medal', year:1975}}}
   /*  Dive.update({ _id: diveId }, { "$pull": { "divers": { "user": userIdToRemove } }}, { safe: true, multi:true }, function(err, obj) {
        //do something smart
    }); */
     User.update({"_id": req.params.id}, { "$pull": {typeExercise: { 'collections': {"_id": req.params.item }}}}, { safe: true, multi:true }, function (err, data) {
            if (err) {
                console.log("500");
                return res.status(500).send(err);
            }
            if (!data) {
                console.log("404");
                return res.status(404).end();
            }
            console.log("200");
            console.log(data);
        });
    });

module.exports = router;