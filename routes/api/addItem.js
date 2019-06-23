const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");

router.post('/', (req, res) => {

    const updateWeights = (id, updateObj) => {
        var update = {
            $addToSet: {
                'logs.$[i].collections': updateObj.logs.collections
            }
        }
        var filter = {
            arrayFilters: [
                {
                 'i.date': updateObj.logs.date
                }
            ]
        }
        
        User.findOneAndUpdate({"_id": id}, update, filter, (err, data) => {
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
        })
    };

    const updateCardio = (id, updateObj) => {
        var update = {
            $addToSet: {
                'cardiologs.$[i].collections': updateObj.cardiologs.collections
            }
        }
        var filter = {
            arrayFilters: [
                {
                 'i.date': updateObj.cardiologs.date
                }
            ]
        }
        User.findOneAndUpdate({"_id": id}, update, filter, (err, data) => {
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
        })
    }

    const updateBodyWeight = (id, updateObj) => {
        var update = {
            $addToSet: {
                'bwlogs.$[i].collections': updateObj.bwlogs.collections
            }
        }
        var filter = {
            arrayFilters: [
                {
                 'i.date': updateObj.bwlogs.date
                }
            ]
        }
        
        User.findOneAndUpdate({"_id": id}, update, filter, (err, data) => {
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
        })
    };

    const updateVids = (id, updateObj) => {
        var update = {
            $addToSet: {
                'vidslogs.$[i].collections': updateObj.vidslogs.collections
            }
        }
        var filter = {
            arrayFilters: [
                {
                 'i.date': updateObj.vidslogs.date
                }
            ]
        }
        
        User.findOneAndUpdate({"_id": id}, update, filter, (err, data) => {
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
        })
    }


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

    if (req.body.bwFlag == 1){
        var updateObj = createObj(req.body.collection);

        var pushThis = {
                bwlogs: updateObj
        }

        updateBodyWeight(req.body.id, pushThis);

    }

    if (req.body.vidsFlag == 1){
        var updateObj = createObj(req.body.collection);

        var pushThis = {
                vidslogs: updateObj
        }

        updateVids(req.body.id, pushThis);
    }
});

module.exports = router;