const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define userSchema

var bwSchema = new Schema({
    date: {type: String},
    collections: [{
        exercise: {type: String},
        sets: {type: String},
        reps: {type: String}
        }]
},{_id: false});

const BodyWeightLogs = mongoose.model('BodyWeightLogs', bwSchema);
module.exports = BodyWeightLogs;