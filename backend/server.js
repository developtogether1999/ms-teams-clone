require('dotenv').config();
const nodemailer = require('nodemailer'); // required to mail meet link
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

const { connectDb } = require('./config/connectDb')
connectDb()

const registerRoute = require('./routes/register')                  //Register route
app.use(registerRoute)

const loginRoute = require('./routes/login')                        //Login route
app.use(loginRoute)

