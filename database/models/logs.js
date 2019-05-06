const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const LogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Logs', LogSchema);