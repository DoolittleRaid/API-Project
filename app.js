const express = require('express'),
	  mongoose = require('mongoose'),
	  bodyParser = require('body-parser'),
	  methodOverride = require('method-override'),
	  passport = require('passport'),
	  // localStrategy = require('passport-local'),
	  // localView = require('passport-local-mongoose'),
	  User = require('./models/user-model.js'),
	  port = 3000,
	  app = express(),
	  routes = require('./routes/routes'),
	  profileRoutes = require('./routes/profile_routes'),
	  passportSetup = require('./config/passport-setup'),
	  keys = require('./config/keys'),
	  cookieSession = require('cookie-session');
//nothing
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// mongoose.connect('mongodb://localhost/auth_demo_app', {useNewUrlParser: true});
mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true}, () => 
	console.log("connected to mongodb")
);
// mongoose.connect('mongodb+srv://MVHagey:mvhage@cluster0-ftiuj.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: [keys.session.cookieKey]
}));



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.use(require('express-session')({ 
	secret: "Abraham Lincoln", 
	resave: false, 
	saveUninitialized: false 
}));

app.use(passport.initialize()); 
app.use(passport.session());
app.use('/auth', routes);
app.use('/profile', profileRoutes);

app.get("/", (req, res) => {
	res.render("home.ejs", {user: req.user});
});

// app.get("/register", (req, res) => {
// 	res.render("register.ejs");
// });

// app.get("/login", (req, res) => {
// 	res.render("login.ejs");
// });

// app.get("/logout", (req, res) => {
// 	res.send("log out route handled with passport");
// });

// app.get("/google", (req, res) => {
// 	res.send('log in with google route');
// });

// app.post("/register", (req, res) => {
// 	res.send("post route here");
// });

// app.post("/login", (req, res) => {
// 	res.send("post route here");
// });

app.listen(port || process.env.PORT, () => console.log(`example app listening at http://localhost:${port}`))