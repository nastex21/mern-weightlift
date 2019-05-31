const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Collection = require('./collections');

//Create Schema
const LogSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    collections: [Collection.schema]
});

module.exports = mongoose.model('Logs', LogSchema);