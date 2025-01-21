const toysR = require("./toys");
const userR = require("./users");


exports.routesInit = (app) => {
  app.use("/toys",toysR);
  app.use("/users",userR);  
}
