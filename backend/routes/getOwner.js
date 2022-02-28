const router = require('express').Router()
const flash = require('express-flash')
const Team = require('../models/teams.model')
const User = require('../models/user.models')
const url = require('url');

router.use(flash())

router.get("/teamdetails",  async(req, res) => { 
     
    console.log('GET TEAM DEATISL');
    let teamid=url.parse(req.url,true).query.paramid;
    try{
        
        const team=await Team.findOne({ _id: teamid})
        var redir = {  redirect: "/createteam", team:team};     
        return res.json(redir);
    console.log('TEAMS',team);
   }catch(err){
       console.log('err',err)
   }
   var redir = {  redirect: "/"};
   return res.json(redir);
}) 
            
 









    

 
module.exports = router   