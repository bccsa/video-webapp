const { postgres } = require("./db/postgres");
const { dataObjects } = require("./db/dataObjects");
const { loadConfig } = require("./config/config");
const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const path = require("path");

// Load configuration from passed configuration file (passed as first argument). Default = .env
let config;
if (process.argv.length > 2) {
    config = loadConfig(process.argv[2])
} else {
    config = loadConfig(path.join(__dirname, "./.env"));
}

if (config) {
    // Database connection
    let db;
    db = new postgres(config.db);
    let dbObjects = new dataObjects(db);

    // Express client web-server
    const clientApp = express();
    const clientHttp = http.createServer(clientApp);

    clientHttp.listen(config.client.port, () => {
        console.log(`Client WebApp running on http://*:${config.client.port}`);
    });

    // Serve the default file
    clientApp.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/index.html"));
    });

    // Serve static files
    clientApp.use(express.static(path.join(__dirname, "../client")));

    // Client socket.io messaging
    const clientIO = new Server(clientHttp, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        }
    });

    // Client socket.io messaging
    clientIO.on('connection', socket => {

        // Send initial data to client
        dbObjects.sections().then(data => {
            socket.emit('data', data);
        });
    });

} else {
    console.error('Unable to load configuration file');
}

