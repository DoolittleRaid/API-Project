//add this file to .gitignore

module.exports = {
	google: {
		clientID: '317597202122-2mgifrj37nlcat47gdogee0bpq7snd9b.apps.googleusercontent.com',
		clientSecret: 'beAPN6R86tt54YA-7LsysZjx'
	},
	mongodb: {
		dbURI: 'mongodb+srv://mvhagey2:mvhage@cluster0-yogxn.mongodb.net/API?retryWrites=true&w=majority'
	},
	session: {
		cookieKey:'Abraham Lincoln'
	}
};

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
