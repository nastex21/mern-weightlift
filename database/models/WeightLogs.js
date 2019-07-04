const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define userSchema

var weightSchema = new Schema({
    date: {type: String},
    collections: [{
        exercise: {type: String},
        sets: {type: String},
        reps: {type: String},
        weight: {type: String}
    }]
});

const WeightLogs = mongoose.model('WeightLogs', weightSchema);
module.exports = WeightLogs;