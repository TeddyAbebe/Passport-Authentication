const account = require("./account");
const auth = require("./auth");
const admin = require("./admin");
const instructor = require("./instructor");
const student = require("./student");

module.exports = function (app) {
  app.use("/", account);
  app.use("/instructor", instructor);
  app.use("/student", student);
  app.use("/auth", auth);
  app.use("/admin", admin);
};
