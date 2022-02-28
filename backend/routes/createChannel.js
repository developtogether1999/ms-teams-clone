const router = require('express').Router()
const passport = require('passport')
const flash = require('express-flash')
const Team = require('../models/teams.model')
const Channel = require('../models/channels.model')
const User = require('../models/user.models')

router.use(flash())
 
 
router.post("/createchannel", async (req, res) => { 
 
    console.log('req rec for create channel',req.body.teamid);
	await Team.findOne({ _id: req.body.teamid }, async (err, doc) => {
		console.log('andar gaya for ccreate channel',err);  
      	if (err) throw err;
      	if (doc){ 
			  console.log(doc);
			  if(req.body.channelname.length==0){
				var redir = {  redirect: "/createteam", message:"Channel name cannot be empty"};
				return res.json(redir);  
		 	  }
              for(let i=0;i<doc.channels.length;i++){
                 if(doc.channels[i]==req.body.channelname){
					var redir = {  redirect: "/createteam", message:"Channel Already Exists"};
					return res.json(redir);
				 }  
              } 
			  var redir = {  redirect: "/", message:"Channel Created"};
			  await Team.updateOne(
                { _id: req.body.teamid },
                { $addToSet: { channels: [ req.body.channelname ] } },
                { new: true })
				const newChannel = new Channel({ 
					name: req.body.channelname,
				    team: req.body.teamid  
			  });
			  await newChannel.save();  
					return res.json(redir);
	        
    	} 
      	
    });
});
 
module.exports = router