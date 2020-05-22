const passport = require('passport'),
	  GoogleStrategy = require('passport-google-oauth20').Strategy,
	  keys = require('./keys'),
	  User = require('../models/user-model');
//cookie handling
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy({
	//options for google strategy--client id and client secret--go to google developer console
	callbackURL: '/auth/google/redirect',
	//docs now need consumerKey and consumerSecret (only for oauth, not oauth20) in lieu of clientID & clientSecret
	clientID: keys.google.clientID,
	clientSecret: keys.google.clientSecret
	}, (accessToken, refreshToken, profile, done) => {
	//check if user exists in database
	User.findOne({googleId: profile.id}).then((currentUser) => {
		if (currentUser){
			//already have user
			done(null, currentUser);
		} 
		else {
			//create new user in database
			new User({
		username: profile.displayName,
		googleId: profile.id
		}).save().then((newUser) => {
			console.log('new user added to database:' + newUser);
			done(null, newUser);
		});
		}
	 });
	})

);


