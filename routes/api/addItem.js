const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");
const Log = require("../../database/models/logs");
const Collections = require("../../database/models/collections");

router.post('/', (req, res) => {

    const update = (id, updateObj) => {
        console.log(id);
        console.log(updateObj);
        //req.body.id, { $push: { "logs": update } },
        User.findByIdAndUpdate(id, updateObj, (err, data) => {
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
            $push: {
                "logs": updateObj
            }
        }
    
        update(req.body.id, pushThis);
    }

    if (req.body.cardioFlag == 1) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            $push: {
                "cardiologs": updateObj
            }
        }
    
        update(req.body.id, pushThis);
    }

    if (req.body.bwFlag == 1){
        console.log("hola");
    }

    if (req.body.vidsFlag == 1){
        console.log('konichiwa');
    }


});

module.exports = router;