const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const CollectionSchema = new Schema({
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
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Collection', CollectionSchema);
