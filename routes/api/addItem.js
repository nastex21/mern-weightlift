const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");

router.post('/', (req, res) => {

    const update = (id, updateObj) => {
        console.log("updateobj");
        console.log(updateObj);
        console.log(req.body);
        User.findOneAndUpdate({"_id": id}, updateObj, (err, data) => {
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
        console.log(updateObj);
         return updateObj; 
    }

    if (req.body.weightFlag == 1) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            $push: {
                logs: updateObj
            }
        }
    
        update(req.body.id, pushThis);
    }

    if (req.body.cardioFlag == 1) {
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            $push: {
                cardiologs: updateObj
            }
        }
    
        update(req.body.id, pushThis);
    }

    if (req.body.bwFlag == 1){
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            $push: {
                bwlogs: updateObj
            }
        }

        update(req.body.id, pushThis);

    }

    if (req.body.vidsFlag == 1){
        var updateObj = createObj(req.body.collection);

        var pushThis = {
            $push: {
                vidslogs: updateObj
            }
        }

        update(req.body.id, pushThis);
    }


});

module.exports = router;