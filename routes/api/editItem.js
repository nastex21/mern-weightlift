const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");

router.post('/',  (req, res) => {
    console.log('edit-items');
    console.log(req.body);

    //WORKS but only for June 7! Need to fix around the variables.
    const { id, date, color, collection } = req.body;

    const createDate = (date) => {
        let newDate = new Date(date);
        var y = newDate.getFullYear();
        var m = newDate.getMonth() + 1;
        var d = newDate.getDate();
        if (Number(d) < 10 && Number(d) > 0) {
            d = "0" + d;
        }

        if (Number(m) < 10 && Number(m) > 0) {
            m = "0" + m;
        }
        const nowDate = y + "-" + m + "-" + d;

        return nowDate;
    }


    var newDate = createDate(date);
    console.log(id);
    console.log(newDate);

    if (color == '#d9534f') {

        var update = {
            $set: {
                'logs.$.collections': collection
            }
        };

        User.findOneAndUpdate({ "_id": id, 'logs': { $elemMatch: { 'date': newDate } } }, update, (err, data) => {
            if (err) {
                return console.log("500");
            }
            if (!data) {
                return console.log("404");
            }
            console.log("200");
        })
    }

    if (color == '#0275d8') {

        var update = {
            $set: {
                'cardiologs.$.collections': collection
            }
        };

        User.findOneAndUpdate({ "_id": id, 'cardiologs': { $elemMatch: { 'date': newDate } } }, update, (err, data) => {
            if (err) {
                return console.log("500");
            }
            if (!data) {
                return console.log("404");
            }
            console.log("200");
        })
    }


    if (color == '#5cb85c') {

        var update = {
            $set: {
                'bwlogs.$.collections': collection
            }
        };

        User.findOneAndUpdate({ "_id": id, 'bwlogs': { $elemMatch: { 'date': newDate } } }, update, (err, data) => {
            if (err) {
                return console.log("500");
            }
            if (!data) {
                return console.log("404");
            }
            console.log("200");
        })
    }

if (color == '#f0ad4e') {

        var update = {
            $set: {
                'vidslogs.$.collections': collection
            }
        };

        User.findOneAndUpdate({ "_id": id, 'vidslogs': { $elemMatch: { 'date': newDate } } }, update, (err, data) => {
            if (err) {
                return console.log("500");
            }
            if (!data) {
                return console.log("404");
            }
            console.log("200");
        })
    }
})

module.exports = router;