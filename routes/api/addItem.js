const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");
const Validate = require("../../validation/validateadd");

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

router.post('/', checkToken, Validate, async (req, res) => {
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
            new: true,
            arrayFilters: [
                {
                    'i.date': updateObj.logs.date
                }
            ]
        };

        User.findOne({ "_id": id, 'logs': { $not: { $elemMatch: { 'date': updateObj.logs.date } } } }, (err, data) => {
            if (err) {
                return res.status(500).end();
            }
            if (!data) {
                let dataID = id;
                return pushData(dataID);
            }

            User.findByIdAndUpdate({ "_id": id }, updateSet, { new: true }, (err, data) => {
                if (err) {
                    return res.status(500).end();
                }
                if (!data) {
                    
                    return res.status(404).end();
                }
                return res.status(200).json(data);
            })

        })
        const pushData = (id) => {
            User.findOneAndUpdate({ "_id": id }, update, filter, (err, data) => {
                
                if (err) {
                    return res.status(500).end();
                }
                if (!data) {
                    return res.status(404).end();
                }
                return res.status(200).json(data);
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
            new: true,
            arrayFilters: [
                {
                    'i.date': updateObj.cardiologs.date
                }
            ]
        };

        User.findOne({ "_id": id, 'cardiologs': { $not: { $elemMatch: { 'date': updateObj.cardiologs.date } } } }, (err, data) => {
            if (err) {
                return res.status(500).end();
            }
            if (!data) {
                let dataID = id;
                return pushData(dataID);
            }
            

            User.findByIdAndUpdate({ "_id": id }, updateSet, { new: true }, (err, data) => {
                
                if (err) {
                    return res.status(500).end();
                }
                if (!data) {                    
                    return res.status(404).end();
                }               
                return res.status(200).json(data);
            })

        })

        const pushData = (id) => {
            User.findOneAndUpdate({ "_id": id }, update, filter, (err, data) => {
                if (err) {
                    return res.status(500).end();
                }
                if (!data) {
                    return res.status(404).end();
                }
                
                
                return res.status(200).json(data);
            });
        };
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
            new: true,
            arrayFilters: [
                {
                    'i.date': updateObj.bwlogs.date
                }
            ]
        };

        User.findOne({ "_id": id, 'bwlogs': { $not: { $elemMatch: { 'date': updateObj.bwlogs.date } } } }, (err, data) => {
            if (err) {
                return res.status(500).end();
            }
            if (!data) {
                let dataID = id;
                return pushData(dataID);
            }
            

            User.findByIdAndUpdate({ "_id": id }, updateSet,  { new: true }, (err, data) => {
                
                if (err) {
                    return res.status(500).end();
                }
                if (!data) {
                    
                    return res.status(404).end();
                }         
                return res.status(200).json(data);
            })

        })

        const pushData = (id) => {
            User.findOneAndUpdate({ "_id": id }, update, filter, (err, data) => {
                if (err) {
                    return res.status(500).end();
                }
                if (!data) {
                    return res.status(404).end();
                }           
                return res.status(200).json(data);
            });
        };
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
            new: true,
            arrayFilters: [
                {
                    'i.date': updateObj.vidslogs.date
                }
            ]
        };

        User.findOne({ "_id": id, 'vidslogs': { $not: { $elemMatch: { 'date': updateObj.vidslogs.date } } } }, (err, data) => {
            if (err) {
                return res.status(500).end();
            }
            if (!data) {
                let dataID = id;
                return pushData(dataID);
            }
            

            User.findByIdAndUpdate({ "_id": id }, updateSet, {new: true}, (err, data) => {
                
                if (err) {
                    return res.status(500).end();
                }
                if (!data) {
                    return res.status(404).end();
                }                
                return res.status(200).json(data);
            })

        })

        const pushData = (id) => {
            User.findOneAndUpdate({ "_id": id }, update, filter, (err, data) => {
                
                if (err) {
                    return res.status(500).end();
                }
                if (!data) {
                    return res.status(404).end();
                }   
                return res.status(200).json(data);
            });
        }
    };


    const createObj = (data) => {
        const exObj = [];
        data.forEach(item => exObj.push(item));

        var updateObj = {
            date: req.body.date,
            collections: [...exObj]
        }

        return updateObj;
    }

    if (req.body.flag == 1) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            logs: updateObj
        }
        updateWeights(req.body.id, pushThis);
    }

    if (req.body.flag == 2) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            cardiologs: updateObj
        }

        updateCardio(req.body.id, pushThis);
    }

    if (req.body.flag == 3) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            bwlogs: updateObj
        }

        updateBW(req.body.id, pushThis);

    }

    if (req.body.flag == 4) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            vidslogs: updateObj
        }

        updateVids(req.body.id, pushThis);
    }
});

module.exports = router;