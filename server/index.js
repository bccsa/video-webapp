const { postgres } = require("./db/postgres");
const { dataObjects } = require("./db/dataObjects");
const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, "../.env") });
var jwt = require('jsonwebtoken');

// PostgreSQL database connection
// ------------------------------
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
// -------------------------
const clientApp = express();
const clientHttp = http.createServer(clientApp);
let maxAge;
if (process.env.CACHE_MAXAGE) {
    maxAge = parseInt(process.env.CACHE_MAXAGE) * 1000; // Express uses milliseconds for maxAge setting
} else {
    maxAge = 3600 * 1000;
}

clientHttp.listen(process.env.PORT, () => {
    console.log(`Web-App running on http://*:${process.env.PORT}`);
});

// Serve the default file
clientApp.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"), { maxAge: maxAge });
});

// Serve static files
clientApp.use(express.static(path.join(__dirname, "../client"), { maxAge: maxAge }));

// Serve client env
var clientEnv = {
    app: {
        title: process.env.APP_TITLE,
        socketUrl: process.env.SOCKET_URL
    },
    auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        audience: process.env.AUTH0_AUDIENCE
    }
}
clientApp.get("/env", (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send(JSON.stringify(clientEnv));
});

// Client socket.io messaging
// --------------------------
const clientIO = new Server(clientHttp, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

// Client socket.io connections
clientIO.on('connection', socket => {
    if (socket.handshake && socket.handshake.auth && socket.handshake.auth.token) {
        try {
            // verify JWT token. ref: https://github.com/auth0/node-jsonwebtoken
            let decoded = jwt.verify(socket.handshake.auth.token, process.env.AUTH0_SECRET, { algorithms: [process.env.AUTH0_ALGORITHM] });
            if (decoded) {
                // Mark socket as authenticated
                socket.data.authenticated = true;
            }
        } catch (err) {
            console.log('unable to decode JWT: ' + err.message);
        }
    }

    if (socket.data.authenticated) {
        // Send initial data to client
        dbObjects.sections().then(data => {
            // setUserView(socket, data);
            socket.emit('data', data);
        });
    }
});
