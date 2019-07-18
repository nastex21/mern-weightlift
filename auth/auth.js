const passport = require('passport');
const User = require('../database/models/user');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('signup', new localStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  //Save the information provided by the user to the the database
  console.log("username");
  console.log(username);
  console.log(password);
  User.findOne({ username: username }).then(user => {
    if (user) {
      return done(null, false, { message: 'User already exists' });
    } else {
      const newUser = new User({
        username: username,
        password: password
      });

      newUser
        .save()
        .then(user => done(null, user, { message: 'User account created successfully' }))
        .catch(err => console.log(err));
    }
  });
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    //Find the user associated with the username provided by the user
    const user = await User.findOne({ username });
    if (!user) {
      //If the user isn't found in the database, return a message
      return done(null, false, { message: 'User not found' });
    }
    //Validate password and make sure it matches with the corresponding hash stored in the database
    //If the passwords match, it returns a value of true.
    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    //Send the user information to the next middleware
    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));

//This verifies that the token sent by the user is valid
passport.use('jwt', new JWTstrategy({
  //secret we used to sign our JWT
  secretOrKey: process.env.SECRET,
  //we expect the user to send the token as a query paramater with the name 'secret_token'
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
  console.log('token');
  console.log(token);
  try {
    //Pass the user details to the next middleware
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));