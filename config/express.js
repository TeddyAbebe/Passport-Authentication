const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

module.exports = function (app) {
  // set up view engine
  app.set("view engine", "ejs");

  // Middleware
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
};
