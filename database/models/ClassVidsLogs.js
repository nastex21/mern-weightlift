const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define userSchema

var classVidsSchema = new Schema({
    date: {type: String},
    collections: [{
        exercise: {type: String},
        hours: {type: String},
        minutes: {type: String},
        completed: {type: String}
    }]
},{_id: false});

const ClassVidsLogs = mongoose.model('ClassVidsLogs', classVidsSchema);
module.exports = ClassVidsLogs;