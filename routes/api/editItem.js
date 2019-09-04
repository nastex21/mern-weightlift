const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");
const Validate = require('../../validation/validate');

router.post('/', Validate, (req, res) => {

    const { id, date, color, collection } = req.body;

    var query, update, filter;

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

    if (color == '#d9534f') {
        if (collection.length == 0) {

            query = {
                "_id": id
            }

            update = {
                '$pull': {
                    'logs': {
                        'date': newDate
                    }
                }
            }

            User.findOneAndUpdate(query, update, {new: true}, (err, data) => {
                if (err) {
                    
                    return res.status(500).end();
                }
                if (!data) {
                    return res.status(404).end();
                }
                console.log(data);
                return res.json(data);
            });
        }

        if (collection.length > 0) {
            for (var i = 0; i < collection.length; i++) {
                var update = {
                    $set: {
                        'logs.$[i].collections': collection
                    }
                };

                var filter = {
                    new: true,
                    arrayFilters: [
                        {
                            'i.collections._id': collection[i]._id
                        }
                    ]
                };

                User.findOneAndUpdate({ "_id": id, 'logs': { $elemMatch: { 'date': newDate } } }, update, filter, (err, data) => {
                    if (err) {
                        return res.status(500).end();

                    }
                    if (!data) {
                        return res.status(404).end();
                    }
                    console.log(data);
                    return res.json(data);
                })
            }
        }
    }

    if (color == '#0275d8') {
        if (collection.length == 0) {

            query = {
                "_id": id
            }

            update = {
                '$pull': {
                    'cardiologs': {
                        'date': newDate
                    }
                }
            }

            User.findOneAndUpdate(query, update, {new: true}, (err, data) => {
                if (err) {
                    
                    return res.status(500).end();
                }
                if (!data) {
                    return res.status(404).end();
                }
                return res.json(data);
                
            });
        }

        if (collection.length > 0) {
            for (var i = 0; i < collection.length; i++) {
                var update = {
                    $set: {
                        'cardiologs.$[i].collections': collection
                    }
                };

                var filter = {
                    new: true,
                    arrayFilters: [
                        {
                            'i.collections._id': collection[i]._id
                        }
                    ]
                };

                User.findOneAndUpdate({ "_id": id, 'cardiologs': { $elemMatch: { 'date': newDate } } }, update, filter, (err, data) => {
                    if (err) {
                        return res.status(500).end();
                    }
                    if (!data) {
                        return res.status(404).end();
                    }
                    return res.json(data);
                })
            }
        }
    }

    if (color == '#5cb85c') {
        if (collection.length == 0) {
            

            query = {
                "_id": id
            }

            update = {
                '$pull': {
                    'bwlogs': {
                        'date': newDate
                    }
                }
            }

            User.findOneAndUpdate(query, update, {new: true}, (err, data) => {
                if (err) {
                    
                    return res.status(500).end();
                }
                if (!data) {
                    return res.status(404).end();
                }
                return res.json(data);
                
            });
        }

        if (collection.length > 0) {
            for (var i = 0; i < collection.length; i++) {
                var update = {
                    $set: {
                        'bwlogs.$[i].collections': collection
                    }
                };

                var filter = {
                    new: true,
                    arrayFilters: [
                        {
                            'i.collections._id': collection[i]._id
                        }
                    ]
                };

                User.findOneAndUpdate({ "_id": id, 'bwlogs': { $elemMatch: { 'date': newDate } } }, update, filter, (err, data) => {
                    if (err) {
                        return res.status(500).end();
                    }
                    if (!data) {
                        return res.status(404).end();
                    }
                    return res.json(data);
                })
            }
        }
    }

    if (color == '#f0ad4e') {

        if (collection.length == 0) {
            
            query = {
                "_id": id
            }

            update = {
                '$pull': {
                    'vidslogs': {
                        'date': newDate
                    }
                }
            }

            User.findOneAndUpdate(query, update, {new: true}, (err, data) => {
                if (err) {
                    
                    return res.status(500).end();
                }
                if (!data) {
                    return res.status(404).end();
                }
                return res.json(data);
                
            });
        }

        if (collection.length > 0) {
            for (var i = 0; i < collection.length; i++) {
                var update = {
                    $set: {
                        'vidslogs.$[i].collections': collection
                    }
                };

                var filter = {
                    new: true,
                    arrayFilters: [
                        {
                            'i.collections._id': collection[i]._id
                        }
                    ]
                };

                User.findOneAndUpdate({ "_id": id, 'vidslogs': { $elemMatch: { 'date': newDate } } }, update, filter, (err, data) => {
                    if (err) {
                        return res.status(500).end();
                    }
                    if (!data) {
                        return res.status(404).end();
                    }
                 return res.json(data);
                })
            }
        }
    }
})

module.exports = router;