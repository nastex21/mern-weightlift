const express = require('express');
const router = express.Router();
const User = require("../../database/models/user");

router.post('/', (req, res) => {
    console.log('edit-items');
    console.log(req.body);

    //WORKS but only for June 7! Need to fix around the variables.
    const { id, date, color, collection } = req.body;

    var update = {
        $set: {
            'logs.$[i].collections': collection
        }
    };

    var filter = {
        arrayFilters: [
            {
                'i.collections._id': collection[0]._id
            }
        ]
    };

    if (color == 'red') {
        console.log('red goes through');
        console.log(id);
        console.log(date);
        console.log(color);
        console.log(collection[0]._id);
        User.findOneAndUpdate({ "_id": id, 'logs': { $elemMatch: { 'date': "2019-06-07" } }}, update , filter, (err, data) => {
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