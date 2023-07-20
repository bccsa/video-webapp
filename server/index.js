const { postgres } = require("./db/postgres");
const { dataObjects } = require("./db/dataObjects");
const { Server } = require("socket.io");
const express = require("express");
var fallback = require('express-history-api-fallback');
const http = require("http");
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, "../.env") });
var jwt = require('jsonwebtoken');
var showdown  = require('showdown'); // markdown to html converter

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
let root = path.join(__dirname, "../client");

let maxAge;
if (process.env.CACHE_MAXAGE) {
    maxAge = parseInt(process.env.CACHE_MAXAGE) * 1000; // Express uses milliseconds for maxAge setting
} else {
    maxAge = 3600 * 1000;
}

clientHttp.listen(process.env.PORT, () => {
    console.log(`Web-App running on http://*:${process.env.PORT}`);
});

// Serve client env
var clientEnv = {
    app: {
        title: process.env.APP_TITLE,
        socketUrl: process.env.SOCKET_URL,
        privacyPolicy: new showdown.Converter().makeHtml(process.env.PRIVACY_POLICY),
    },
    auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        audience: process.env.AUTH0_AUDIENCE,
        bypass: process.env.AUTH0_BYPASS
    }
}

clientApp.get("/env", (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send(JSON.stringify(clientEnv));
});

// Serve static files
clientApp.use(express.static(root, { maxAge: maxAge }));

// Fallback route - route all other requests to single page application
clientApp.use(fallback('index.html', { root: root }));

// Client socket.io messaging
// --------------------------
const clientIO = new Server(clientHttp, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

let auth0_bypass = process.env.AUTH0_BYPASS;

// Client socket.io connections
clientIO.on('connection', socket => {
    if (socket.handshake && socket.handshake.auth && socket.handshake.auth.token || auth0_bypass) {
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

    if (socket.data.authenticated || auth0_bypass) {
        // Send initial data to client
        dbObjects.sections().then(data => {
            // setUserView(socket, data);
            socket.emit('data', data);
        });
    }
});
