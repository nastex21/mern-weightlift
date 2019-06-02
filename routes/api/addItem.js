const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");
const Log = require("../../database/models/logs");
const Collections = require("../../database/models/collections");

router.post('/', (req, res) => {
    console.log(req.body.id);
    console.log(req.body.date);
    console.log("addItem triggered");
    const arr = [];
    let newDate = new Date(req.body.date);
    console.log(newDate);
    var y = newDate.getFullYear();
    var m = newDate.getMonth() + 1;
    var d = newDate.getDate();
    const nowDate = y + "-" + m + "-" + d;
    console.log(nowDate);
    const exObj = [];
    req.body.collection.forEach(item => exObj.push(item));
    var update = {
        date: nowDate,
        collections: [...exObj]
    }

    User.findOneAndUpdate({"_id": req.body.id}, {$addToSet:{"logs": update}}, (err, data) => { 
        if (err) {
            console.log("500");
            return res.status(500).send(err);
        }
        if (!data) {
            console.log("404");
            return res.status(404).end();
        }

        return;
        }
    )
})


module.exports = router;