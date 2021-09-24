const router = require('express').Router()
const User = require('../models/user.models')

router.get('/chat/getChatEngineProjectID', async (req, res) => {
    if (req.isAuthenticated()) {
        var redir = { redirect: "/", CHAT_ENGINE_PROJECT_ID: process.env.CHAT_ENGINE_PROJECT_ID };
        return res.json(redir);
    }
    else{
      	var redir = { redirect: "/login", message:'Enter your credentials to Log In' };
        return res.json(redir);
    }
});

router.get('/chat/getUsernames', async (req, res) => {
    try {
        console.log('req.user = ', req.user)
        const users = await User.find({username : {$ne: req.user.username}}, { username: 1 })
        const usernames = users.map(user => {
            return { key: user._id, value: user.username }
        });
        return res.json(usernames);
    } catch(e) {
        console.log('err', e);
        return res.json([]);
    }
});

module.exports = router