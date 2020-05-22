const router = require('express').Router();

const authCheck = (req, res, next) => {
	if(!req.user) {
		res.redirect("/auth/login");
	}
	else {
		next();
	}
};

router.get("/", authCheck, (req, res) => {
	//this arbitrarily named user object allows us to access req.user in the ejs/view file
	res.render("profile.ejs", {user: req.user});
});

module.exports = router;