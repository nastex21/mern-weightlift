require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const app = express();

//Route requires
const user = require('./routes/user');

//MIDDLEWARE
app.use(morgan('dev'));

// Bodyparser
app.use(express.json());


// Sessions
app.use(
	session({
		secret: process.env.SECRET, //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));