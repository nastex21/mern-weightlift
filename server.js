require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dbConnection = require('./database');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();

var helmet = require('helmet')
app.use(helmet())

// Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//MIDDLEWARE
app.use(morgan('dev'));

app.use(
	session({
		secret: process.env.SECRET, //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
);
 
// Routes
app.use('/api/dashboard', require('./routes/api/dashboard') );
app.use('/api/login', require('./routes/api/login'));
app.use('/api/logout', require('./routes/api/logout'));
app.use('/api/signup', require('./routes/api/signup'));
app.use('/api/add-items', require('./routes/api/addItem'));
app.use('/api/edit-items', require('./routes/api/editItem'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production'){
	//Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//Handle errors
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({ error : err });
  });

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));