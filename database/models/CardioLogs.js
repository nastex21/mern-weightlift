const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define userSchema

var cardioSchema = new Schema({
    date: {type: String},
    collections: [{
        exercise: {type: String},
        distance: {type: String},
        hours: {type: String},
        minutes: {type: String}
    }]
},{_id: false});

const CardioLogs = mongoose.model('CardioLogs', cardioSchema);
module.exports = CardioLogs;