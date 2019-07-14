const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CardioLogs = require('./CardioLogs');
const WeightLogs = require('./WeightLogs');
const BodyWeightLogs = require('./BodyWeightLogs');
const ClassVidsLogs = require('./ClassVidsLogs');
mongoose.promise = Promise;

// Define userSchema

var userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	date: { type: Date, default: Date.now },
	logs: [WeightLogs.schema],
	cardiologs: [CardioLogs.schema],
	bwlogs: [BodyWeightLogs.schema],
	vidslogs: [ClassVidsLogs.schema]
})

const User = mongoose.model('User', userSchema)
module.exports = User