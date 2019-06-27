const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");
const Validate = require('../../validation/validate');

router.post('/', Validate, (req, res) => {

    const updateWeights = (id, updateObj) => {
        var update = {
            $addToSet: {
                'logs.$[i].collections': updateObj.logs.collections
            }
        };

        var updateSet = {
            $push: {
                'logs': {
                    'date': updateObj.logs.date,
                    'collections': updateObj.logs.collections
                }
            }
        }

        var filter = {
            arrayFilters: [
                {
                    'i.date': updateObj.logs.date
                }
            ]
        };

        var counter = 0;
        if (counter == 0) {
            User.findOne({ "_id": id, 'logs': { $not: { $elemMatch: { 'date': updateObj.logs.date } } } }, (err, data) => {
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                console.log("200");

                User.findByIdAndUpdate({ "_id": id }, updateSet, (err, data) => {
                    console.log("second findOneAndUpdate");
                    if (err) {
                        console.log("500");
                        return res.status(500).send(err);
                    }
                    if (!data) {
                        console.log("404");
                        return res.status(404).end();
                    }
                    counter = 1;
                    console.log("200");
                    console.log(data);
                })

            })
        };

        if (counter == 0) {
            User.findOneAndUpdate({ "_id": id }, update, filter, (err, data) => {
                console.log("first findOneAndUpdate");
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                counter = 1;
                console.log("200");
                console.log(data);
            });
        }
    };

    const updateCardio = (id, updateObj) => {
        var update = {
            $addToSet: {
                'cardiologs.$[i].collections': updateObj.cardiologs.collections
            }
        };

        var updateSet = {
            $push: {
                'cardiologs': {
                    'date': updateObj.cardiologs.date,
                    'collections': updateObj.cardiologs.collections
                }
            }
        }

        var filter = {
            arrayFilters: [
                {
                    'i.date': updateObj.cardiologs.date
                }
            ]
        };

        var counter = 0;
        if (counter == 0) {
            User.findOne({ "_id": id, 'cardiologs': { $not: { $elemMatch: { 'date': updateObj.cardiologs.date } } } }, (err, data) => {
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                console.log("200");

                User.findByIdAndUpdate({ "_id": id }, updateSet, (err, data) => {
                    console.log("second findOneAndUpdate");
                    if (err) {
                        console.log("500");
                        return res.status(500).send(err);
                    }
                    if (!data) {
                        console.log("404");
                        return res.status(404).end();
                    }
                    counter = 1;
                    console.log("200");
                    console.log(data);
                })

            })
        };

        if (counter == 0) {
            User.findOneAndUpdate({ "_id": id }, update, filter, (err, data) => {
                console.log("first findOneAndUpdate");
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                counter = 1;
                console.log("200");
                console.log(data);
            });
        }
    };

    const updateBW = (id, updateObj) => {
        var update = {
            $addToSet: {
                'bwlogs.$[i].collections': updateObj.bwlogs.collections
            }
        };

        var updateSet = {
            $push: {
                'bwlogs': {
                    'date': updateObj.bwlogs.date,
                    'collections': updateObj.bwlogs.collections
                }
            }
        }

        var filter = {
            arrayFilters: [
                {
                    'i.date': updateObj.bwlogs.date
                }
            ]
        };

        var counter = 0;
        if (counter == 0) {
            User.findOne({ "_id": id, 'bwlogs': { $not: { $elemMatch: { 'date': updateObj.bwlogs.date } } } }, (err, data) => {
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                console.log("200");

                User.findByIdAndUpdate({ "_id": id }, updateSet, (err, data) => {
                    console.log("second findOneAndUpdate");
                    if (err) {
                        console.log("500");
                        return res.status(500).send(err);
                    }
                    if (!data) {
                        console.log("404");
                        return res.status(404).end();
                    }
                    counter = 1;
                    console.log("200");
                    console.log(data);
                })

            })
        };

        if (counter == 0) {
            User.findOneAndUpdate({ "_id": id }, update, filter, (err, data) => {
                console.log("first findOneAndUpdate");
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                counter = 1;
                console.log("200");
                console.log(data);
            });
        }
    };

    const updateVids = (id, updateObj) => {
        var update = {
            $addToSet: {
                'vidslogs.$[i].collections': updateObj.vidslogs.collections
            }
        };

        var updateSet = {
            $push: {
                'vidslogs': {
                    'date': updateObj.vidslogs.date,
                    'collections': updateObj.vidslogs.collections
                }
            }
        }

        var filter = {
            arrayFilters: [
                {
                    'i.date': updateObj.vidslogs.date
                }
            ]
        };

        var counter = 0;
        if (counter == 0) {
            User.findOne({ "_id": id, 'vidslogs': { $not: { $elemMatch: { 'date': updateObj.vidslogs.date } } } }, (err, data) => {
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                console.log("200");

                User.findByIdAndUpdate({ "_id": id }, updateSet, (err, data) => {
                    console.log("second findOneAndUpdate");
                    if (err) {
                        console.log("500");
                        return res.status(500).send(err);
                    }
                    if (!data) {
                        console.log("404");
                        return res.status(404).end();
                    }
                    counter = 1;
                    console.log("200");
                    console.log(data);
                })

            })
        };

        if (counter == 0) {
            User.findOneAndUpdate({ "_id": id }, update, filter, (err, data) => {
                console.log("first findOneAndUpdate");
                if (err) {
                    return console.log("500");
                }
                if (!data) {
                    return console.log("404");
                }
                counter = 1;
                console.log("200");
                console.log(data);
            });
        }
    };

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

    const createObj = (data) => {
        const exObj = [];
        var nowDate = createDate(req.body.date);
        data.forEach(item => exObj.push(item));

        var updateObj = {
            date: nowDate,
            collections: [...exObj]
        }

        return updateObj;
    }

    if (req.body.weightFlag == 1) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            logs: updateObj
        }

        updateWeights(req.body.id, pushThis);
    }

    if (req.body.cardioFlag == 1) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            cardiologs: updateObj
        }

        updateCardio(req.body.id, pushThis);
    }

    if (req.body.bwFlag == 1) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            bwlogs: updateObj
        }

        updateBW(req.body.id, pushThis);

    }

    if (req.body.vidsFlag == 1) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            vidslogs: updateObj
        }

        updateVids(req.body.id, pushThis);
    }
});

module.exports = router;