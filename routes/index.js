const account = require("./account");
const auth = require("./auth");
const admin = require("./admin");

module.exports = function (app) {
  app.use("/", account);
  app.use("/auth", auth);
  app.use("/admin", admin);
};
