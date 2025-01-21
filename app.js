const express = require("express");
const path = require("path");
const http = require("http");
require("./db/mongoConnect");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swaggerDocs");

const { routesInit } = require("./routes/configRoutes");

const app = express();

app.use(express.json());

routesInit(app);

app.use("/", swaggerUI.serve, swaggerUI.setup({
    openapi: "3.0.0",
    info: {
      title: "Toy and User API",
      version: "1.0.0",
      description: "API documentation for managing toys and users",
    },
    paths: swaggerDocs.paths,
    components: swaggerDocs.components,
  }));
  

const server = http.createServer(app);
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});