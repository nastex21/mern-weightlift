const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");
const Log = require("../../database/models/logs");
const Collections = require("../../database/models/collections");

router.post('/', (req, res) => {
    console.log(req.body.id);
    console.log("addItem triggered");
    const arr = [];
    let newDate = new Date();
    var y = newDate.getFullYear();
    var m = newDate.getMonth() + 1;
    var d = newDate.getDate();
    const nowDate = y + "-" + m + "-" + d;
    const exObj = [];
    req.body.collection.forEach(item => exObj.push(item));
    const newObj = {
        date: nowDate,
        collections: [...exObj]
    }

    console.log(newObj);

 /*    date: {
        type: Date,
        required: true
    },
    collections: [
        {
        exercise: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    total: {
        type: Number
    } */

    console.log(new Date());
    var update = {
            date: nowDate,
            collections: [{
                exercise: "Pushups",
                sets: 5,
                reps: 10,
                weight: 20,
                total: 1000
            }]
    }

    User.findByIdAndUpdate(req.body.id, {$push: {logs: update}}, (err, data) => {
        if (err) {
            console.log("500");
            return res.status(500).send(err);
        }
        if (!data) {
            console.log("404");
            return res.status(404).end();
        }
        console.log("200");
       return res.status(200).send(data);
           /*  const logs = new Log({
                date: username,
            })
     
             logs.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            }) *
            console.log(data) */
        }
    )
})


module.exports = router;