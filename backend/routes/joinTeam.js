const router = require('express').Router()
const passport = require('passport')
const flash = require('express-flash')
const Team = require('../models/teams.model')
const User = require('../models/user.models')

router.use(flash())
 

router.post("/jointeam", async (req, res) => { 
    console.log('OOOOOPPPPPPPPPPPPPPPP')
    console.log('req rec',req.body.user);
	await Team.findOne({ code: req.body.teamcode }, async (err, doc) => {
		console.log('andar gaya',err); 
      	if (err) throw err;
      	else if (doc){ 
                console.log('JOIN TEAM',doc.participants.length);
                let d=0;
                for (let i = 0; i < (doc.participants.length); i++) {
                    if(doc.participants[i]==req.body.user)
                    {
                      d=1;
                      break;  
                    }
                  }
                if(d==1)
                {
                    var redir = {  redirect: "/createteam", message:"You are already in the team"};
                    return res.json(redir);
                }else{
                    var redir = { redirect: "/teams", message:"Succesfully added"};
                    await Team.updateOne(
                        { code: req.body.teamcode },
                        { $addToSet: { participants: [ req.body.user ] } },
                        { new: true })
                    await User.updateOne(
                            { username: req.body.user },
                            { $addToSet: { teams: [ doc._id ] } },
                            { new: true })
                    return res.json(redir);
                }
	       
    	} 
      	else {
            var redir = {  redirect: "/createteam", message:"Team does not exists"};
        	return res.json(redir);
        	
			
    	}
    });
});
 
module.exports = router