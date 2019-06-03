const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");
const Log = require("../../database/models/logs");
const Collections = require("../../database/models/collections");

router.post('/', (req, res) => {
    const arr = [];
    let newDate = new Date(req.body.date);
    var y = newDate.getFullYear();
    var m = newDate.getMonth() + 1;
    var d = newDate.getDate();
    if (Number(d) < 10 && Number(d) > 0){
        d = "0" + d;
    }

    if (Number(m) < 10 && Number(m) > 0){
        m = "0" + m;
    }
    const nowDate = y + "-" + m + "-" + d;
 
    const exObj = [];
    req.body.collection.forEach(item => exObj.push(item));
    var update = {
        date: nowDate,
        collections: [...exObj]
    }
User.findByIdAndUpdate(req.body.id, {$push: {"logs": update}}, (err, data) => {
   if (err) {
        console.log("500");
        return res.status(500).send(err);
    }
    if (!data) {
        console.log("404");
        return res.status(404).end();
    }
    console.log("200");
    console.log(data.logs);
} ) 


});

module.exports = router;