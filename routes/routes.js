const router = require('express').Router(),
	  passport = require('passport');
// router.get("/auth", (req, res) => {
// 	res.render("home.ejs");
// });

// router.get("/register", (req, res) => {
// 	res.render("register.ejs");
// });

router.get("/login", (req, res) => {
	res.render("login.ejs", {user: req.user});
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

//google parameter gets passed in under the passport.use GoogleStrategy(?)--part of passport docs
router.get("/google", passport.authenticate('google', {
	scope:['profile']
}));

router.get("/google/redirect", passport.authenticate('google'), (req, res) => {
	res.redirect('/profile');
});

// router.post("/register", (req, res) => {
// 	res.send("post route here");
// });

router.post("/login", (req, res) => {
	res.send("post route here");
});

//edit2

module.exports = router;