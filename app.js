const express = require("express")
const path = require("path");
const http = require("http");
require("./db/mongoConnect")

const {routesInit} = require("./routes/configRoutes")


const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

routesInit(app);

const server = http.createServer(app);
const port = process.env.PORT || 3001
server.listen(port)