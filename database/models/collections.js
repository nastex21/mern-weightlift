const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const collectionSchema = new Schema({
    exercise: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    total: {
        type: Number
    }
});

collectionSchema.pre('save', function (next) {
	this.total = this.sets * this.reps * this.weight;
	next();
})

module.exports = mongoose.model('Collection', collectionSchema);
