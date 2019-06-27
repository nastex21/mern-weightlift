const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");
const Validate = require('../../validation/validate');

router.post('/', Validate, (req, res) => {
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

    if (color == 'red') {

        for (var i = 0; i < collection.length; i++) {
            var update = {
                $set: {
                    'logs.$[i].collections': collection
                }
            };

            var filter = {
                arrayFilters: [
                    {
                        'i.collections._id': collection[i]._id
                    }
                ]
            };

            User.findOneAndUpdate({ "_id": id, 'logs': { $elemMatch: { 'date': newDate } } }, update, filter, (err, data) => {
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                console.log("200");
            })
        }
    }

    if (color == 'blue') {

        for (var i = 0; i < collection.length; i++) {
            var update = {
                $set: {
                    'cardiologs.$[i].collections': collection
                }
            };

            var filter = {
                arrayFilters: [
                    {
                        'i.collections._id': collection[i]._id
                    }
                ]
            };

            User.findOneAndUpdate({ "_id": id, 'cardiologs': { $elemMatch: { 'date': newDate } } }, update, filter, (err, data) => {
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                console.log("200");
            })
        }
    }

    if (color == 'green') {

        for (var i = 0; i < collection.length; i++) {
            var update = {
                $set: {
                    'bwlogs.$[i].collections': collection
                }
            };

            var filter = {
                arrayFilters: [
                    {
                        'i.collections._id': collection[i]._id
                    }
                ]
            };

            User.findOneAndUpdate({ "_id": id, 'bwlogs': { $elemMatch: { 'date': newDate } } }, update, filter, (err, data) => {
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                console.log("200");
            })
        }
    }

    if (color == 'black') {

        for (var i = 0; i < collection.length; i++) {
            var update = {
                $set: {
                    'vidslogs.$[i].collections': collection
                }
            };

            var filter = {
                arrayFilters: [
                    {
                        'i.collections._id': collection[i]._id
                    }
                ]
            };

            User.findOneAndUpdate({ "_id": id, 'vidslogs': { $elemMatch: { 'date': newDate } } }, update, filter, (err, data) => {
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                console.log("200");
            })
        }
    }
})

module.exports = router;