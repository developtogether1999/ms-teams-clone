
const res = require('dotenv').config()
// console.log(res)

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");  // socket io is required for successful connection between peers
const io = socket(server);
const path = require('path');
const mongoose = require("mongoose"); // mongo DB used to save users's account info
const cors = require("cors");
const passport = require("passport"); // passport-local used for user authentication
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");   // used to encrypt user's password
const session = require("express-session");
const bodyParser = require("body-parser");
const User = require("./models/user.models");
const flash = require("express-flash");  


const dbURI = "mongodb://localhost/ms-teams-database"
        mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(result => {
                console.log("Mongoose Is Connected");
                server.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
            })
            .catch(err => console.log(err));
        

app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////cors is used to allow cross-origin request

app.use(
  	cors({
	    origin: "http://localhost:3000", 
    	methods: [ "GET", "POST" ],
    	credentials: true,
  	})
);

app.use(
    session({
      	secret: "secretcode",
      	resave: true,
      	saveUninitialized: true,
    })
);

app.use(cookieParser("secretcode"));

////Initializing local-passport for user authentication
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport-config")(passport);

const registerRoute = require('./routes/register')                  //Register route
app.use(registerRoute)

const loginRoute = require('./routes/login')                        //Login route
app.use(loginRoute)

const createTeamRoute = require('./routes/createTeam')                        //Login route
app.use(createTeamRoute)

const getTeamRoute = require('./routes/getteams')                        //Login route
app.use(getTeamRoute)

const chatRoute = require('./routes/chat')
app.use(chatRoute)

const joinTeam = require('./routes/jointeam')
app.use(joinTeam)

const getTeams = require('./routes/getTeams')
app.use(getTeams)

const getOwner = require('./routes/getOwner')
app.use(getOwner)

const createChannel = require('./routes/createChannel')
app.use(createChannel)

// const PORT = process.env.PORT
// server.listen( PORT || 8000, () => {                                           //Server started locally on PORT (currently 3000)
//     console.log(`Server started on PORT ${PORT || 8000}`)
// })