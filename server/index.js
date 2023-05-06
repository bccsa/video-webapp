const { postgres } = require("./db/postgres");
const { dataObjects } = require("./db/dataObjects");
const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const path = require("path");
require('dotenv').config({path: path.join(__dirname, "../.env")});
var { authRouter, authSocketIO } = require('./routes/auth');
var session = require('express-session');
var passport = require('passport');
var SQLiteStore = require('connect-sqlite3')(session);
var { mkdirp } = require('mkdirp');

let db;
db = new postgres({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
let dbObjects = new dataObjects(db);

// Express client web-server
const clientApp = express();
const clientHttp = http.createServer(clientApp);

clientHttp.listen(process.env.SERVER_PORT, () => {
    console.log(`Client WebApp running on http://*:${process.env.SERVER_PORT}`);
});

// Serve the default file
clientApp.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Serve static files
clientApp.use(express.static(path.join(__dirname, "../client")));

// Serve client env
var clientEnv = {
    app: {
        title: process.env.APP_TITLE,
        socketUrl: process.env.SERVER_PROTOCOL + "://" + process.env.SERVER_HOSTNAME + ":" + process.env.SERVER_PORT
    },
    auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID
    }
}
clientApp.get("/env", (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send(JSON.stringify(clientEnv));
});

// Create and setup session database
mkdirp.sync('./var/db')

let sessionMiddleware = session({
    secret: 'keyboard cat', // To do: Create random secrets periodically as array with newest in top of array - see https://www.npmjs.com/package/express-session#secret
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({
        db: 'sessions.db',
        dir: './var/db'
    })
});

clientApp.use(sessionMiddleware);
clientApp.use(passport.authenticate('session'));

// Routes
clientApp.use('/', authRouter);

// Client socket.io messaging
const clientIO = new Server(clientHttp, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// Pass session to socket.io to identify socket users
clientIO.engine.use(sessionMiddleware);

// Client socket.io messaging
clientIO.on('connection', socket => {
    // Send initial data to client
    dbObjects.sections().then(data => {
        // setUserView(socket, data);
        socket.emit('data', data);
    });

    // if (socket.request.session.passport) {
    //     socket.emit('user', {
    //         userName: socket.request.session.passport.user.name,
    //     });
    // }
});

/**
 * Set control data for user account controls
 * @param {*} socket 
 * @param {*} data - Data message to be sent to the Socket.io client
 */
function setUserView(socket, data) {
    let userName = '';
    if (socket.request.session.passport) {
        userName = socket.request.session.passport.user.name;
    }

    data.User = {
        controlType: "section",
        displayName: "User",
        login: {
            controlType: "userLogin",
            userName: userName,
        }
    }
}


