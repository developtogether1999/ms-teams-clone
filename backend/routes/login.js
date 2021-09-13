const router = require('express').Router()
const passport = require('passport')
const flash = require('express-flash')


router.use(flash())



router.post("/login",  (req, res, next) => { // req is request, res is response
    passport.authenticate("local", (err, user, info) => {
      	if (err) throw err;  
      	if (!user) {
        	var redir = {  message:"Incorrect Username or Wrong Password"};
        	return res.json(redir);
    	} 
      	else {
        	req.logIn(user, (err) => {
          		if (err) throw err;
          		var redir = { redirect: "/" , message:"Login Successfully" , userName:req.user.username };
          		///// redir is the redirect information passed to front end react app.
          		return res.json(redir);
        	});
      	}
    })(req, res, next);
});

router.get('/login',  (req, res) => {
    if (req.isAuthenticated()) {
        var redir = { redirect: "/" , message:'Already Logged In', userName:req.user.username};
        return res.json(redir);
    }
    else{
      	var redir = { redirect: "/login", message:'Enter your credentials to Log In' };
        return res.json(redir);
    }
});


router.get('/logout', (req, res) => {
	req.logOut() ;   // logOut function by Passport
	req.session.destroy();
	return res.status(200).json({message: 'LOGOUT_SUCCESS'});
})

module.exports = router