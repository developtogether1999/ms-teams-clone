
const res = require('dotenv').config()
// console.log(res)

const express = require("express");
const app = express();

const server = require('http').Server(app)
// socket io is required for successful connection between peers
const io = require('socket.io')(server)

const mongoose = require("mongoose"); // mongo DB used to save users's account info
const cors = require("cors");
const passport = require("passport"); // passport-local used for user authentication
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
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

const chatRoute = require('./routes/chat');
app.use(chatRoute)

const onlineUsers = {};
const socketIdOf = {};
const users = {};
const socketToRoom = {};

io.on("connection", (socket) => {

	socket.on("USER_ONLINE", (username) => {
		if(username != '' && socket.id!='') {
			onlineUsers[socket.id] = username;
			socketIdOf[username] = socket.id;
		}
	})

	socket.on("disconnect", () => {
		const roomId = socketToRoom[socket.id];
		let room = users[roomId];
		if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomId] = room;
        }

		const username = onlineUsers[socket.id];
		if(username) {
			delete onlineUsers[socket.id]
			delete socketIdOf[username]
		}
	})

	socket.on('join-room', (data) => {

		const roomId = data.roomId;

		socket.join(roomId);

		if (users[roomId]) {
            const length = users[roomId].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomId].push(socket.id);
        } else {
            users[roomId] = [socket.id];
        }
		socketToRoom[socket.id] = roomId;
        const usersInThisRoom = users[roomId].filter(id => id !== socket.id);
		socket.emit("all users", usersInThisRoom);
	})

	socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerId: payload.callerId });
    });

	socket.on("returning signal", payload => {
        io.to(payload.callerId).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

	socket.on("callUser", (data) => {
		const userToCall = data.userToCall
		if(socketIdOf[userToCall] && onlineUsers[data.from]) {
			io.to(socketIdOf[userToCall]).emit("receivingCall", { from: data.from, name: onlineUsers[data.from], roomId: data.roomId })
		}
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted")
	})

	socket.on("rejectCall", (data) => {
		io.to(data.to).emit("callRejected")
	})

	socket.on("endCall", () => {
		const roomId = socketToRoom[socket.id]
		io.to(roomId).emit('user left', { peerId: socket.id });
	})

})

const getTeamRoute = require('./routes/getteams')                        //Login route
app.use(getTeamRoute)

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