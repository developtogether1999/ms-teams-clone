const router = require('express').Router()
const passport = require('passport')
const flash = require('express-flash')
const Team = require('../models/teams.model')

router.use(flash())
 

router.post("/createteam",  (req, res) => { 
    ////checking if another user with same username already exists
    console.log('req rec',req.body.teamname);
	Team.findOne({ name: req.body.teamname }, async (err, doc) => {
		console.log('andar gaya',err); 
      	if (err) throw err;
      	if (doc){ 
			  console.log(doc);
	        var redir = {  redirect: "/createteam", message:"Team Already Exists"};
        	return res.json(redir);
    	} 
      	if (!doc) {
        	////username and password is required during creation of an account
			console.log('aur andar gaya');
        	if(req.body.teamname.length==0){
          		var redir = {  redirect: "/createteam", message:"Teamname cannot be empty"};
          		return res.json(redir);  
        	}
        	if(req.body.teamcode.length==0){
          		var redir = {  redirect: "/createteam", message:"Team code cannot be empty"};
          		return res.json(redir);  
        	}

        	////encryption of password using bcrypt
        	const newTeam = new Team({
          		owner: 'A',
          		name: req.body.teamname,
                code: req.body.teamcode  
        	});
			console.log(newTeam) 
        	await newTeam.save();
        	var redir = { redirect: "/teams", message:"Team Created"};
        	return res.json(redir);
    	}
    });
});
 
module.exports = router