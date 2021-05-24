const fs = require("fs");
const path = require("path")
const https = require("https");
const http = require("http");
require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();

app.use(cors());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/gabencoin.xyz/privkey.pem",
    "utf8"
);
const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/gabencoin.xyz/cert.pem",
    "utf8"
);
const ca = fs.readFileSync(
    "/etc/letsencrypt/live/gabencoin.xyz/chain.pem",
    "utf8"
);

const creds = { key: privateKey, cert: certificate, ca: ca };

const httpServer = http.createServer(app);
const httpsServer = https.createServer(creds, app);

httpServer.listen(80, () => {});
httpsServer.listen(443, () => {});
