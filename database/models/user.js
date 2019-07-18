const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
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
});

userSchema.pre('save', async function(next){
	const user = this;

	const hash = await bcrypt.hash(this.password, 10);

	this.password = hash;

	next();
});

userSchema.methods.isValidPassword = async function(password){

	const user = this;

	const compare = await bcrypt.compare(password, user.password);

	return compare;
}

const User = mongoose.model('User', userSchema)
module.exports = User