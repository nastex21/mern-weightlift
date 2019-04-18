require('dotenv').config();
//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//connect to database
mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('Database is connected'))
    .catch(err => console.log('Can not connect to the database' + err));


module.exports = mongoose.connection