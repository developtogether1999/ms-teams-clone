const router = require('express').Router()
const flash = require('express-flash')
const Team = require('../models/teams.model')
const User = require('../models/user.models')


router.use(flash())

router.get("/getteams",  async(req, res) => { 
     
    let teamsname=[];
    let teamsid=[];
    let teams=[];
    console.log('TERI MAA KA',req.user.username)
    try{
        
        const user=await User.findOne({ username: req.user.username})
    for(let i=0;i<user.teams.length;i++){
        let teamdetails=await Team.findOne({_id: user.teams[i]});
        teamsname.push(teamdetails.name);
        teamsid.push(teamdetails._id);
        teams.push(teamdetails);

    }
    console.log('TEAMS',teams);
   }catch(err){
       console.log('err',err)
   }
   var redir = {  redirect: "/createteam", teamsname:teamsname, teamsid:teamsid, teams:teams};
   return res.json(redir);
}) 
            










    

 
module.exports = router   