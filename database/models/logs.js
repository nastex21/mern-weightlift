const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Collection = require('./collections');

//Create Schema
const logSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    collections: [Collection.schema],
    overallDailyTotal: {
        type: Number
    }
});

logSchema.pre('save', function (next) {
	next();
})

module.exports = mongoose.model('Logs', logSchema);