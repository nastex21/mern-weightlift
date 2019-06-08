const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema

var userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	date: {type: Date, default: Date.now},
    logs: { type : Array , "default" : [] },
	cardiologs: {type: Array, "default": []},
	bwlogs: {type: Array, "default": []},
	vidsLogs: {type: Array, "default": []}
})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		console.log("triggered")
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User