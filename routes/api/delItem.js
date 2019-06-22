const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");

router.delete('/:color/itemid/:item/user/:id', (req, res, next) => {
    console.log('delitems');
    console.log(req.params);
    var typeExercise = '';
    req.params.color == "red" ? typeExercise = "logs" : req.params.color == "blue" ? typeExercise = 'cardiologs' : req.params.color == "black" ? typeExercise = "vidslogs" : req.params.color == "green" ? typeExercise = "bwlogs" : undefined;


    if (typeExercise == "vidslogs") {
        User.findOneAndUpdate({ "_id": req.params.id }, {$pull: {"vidslogs.$[].collections": {"_id": req.params.item}}}, function(err, data){
            if (err){
                console.log(err)
            }
            console.log("200");
            console.log(data)
        })
    }
});


module.exports = router;