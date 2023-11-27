const account = require("./account");
const auth = require("./auth");

module.exports = function (app) {
  app.use("/", account);
  app.use("/auth", auth);
};
