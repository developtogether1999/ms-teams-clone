const router = require('express').Router()
const passport = require('passport')
const flash = require('express-flash')
const Team = require('../models/teams.model')
const User = require('../models/user.models')

router.use(flash())
 

router.post("/createteam", async (req, res) => { 
 
    console.log('req rec',req.body.owner);
	await Team.findOne({ name: req.body.teamname }, async (err, doc) => {
		console.log('andar gaya',err); 
      	if (err) throw err;
      	if (doc){ 
			  console.log(doc);
	        var redir = {  redirect: "/createteam", message:"Team Already Exists"};
        	return res.json(redir);
    	} 
      	if (!doc) {
        	
        	if(req.body.teamname.length==0){
          		var redir = {  redirect: "/createteam", message:"Teamname cannot be empty"};
          		return res.json(redir);  
        	}
        	if(req.body.teamcode.length==0){
          		var redir = {  redirect: "/createteam", message:"Team code cannot be empty"};
          		return res.json(redir);  
        	}  

        	
        	const newTeam = new Team({ 
          		owner: req.body.user, 
          		name: req.body.teamname,
                code: req.body.teamcode  
        	});
			
			console.log(newTeam) 
        	await newTeam.save();
        	var redir = { redirect: "/teams", message:"Team Created"};
        	await Team.updateOne(
                { code: req.body.teamcode },
                { $addToSet: { participants: [ req.body.user ] } },
                { new: true })
			await User.updateOne(
					{ username: req.body.user },
					{ $addToSet: { teams: [ newTeam._id ] } },
					{ new: true })
			return res.json(redir);
			
    	}
    });
});
 
module.exports = router