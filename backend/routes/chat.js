const router = require('express').Router()

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

module.exports = router