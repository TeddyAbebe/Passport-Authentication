require("dotenv").config();
const express = require("express");
const Routes = require("./routes");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const passport = require("passport");
// const { JwtStrategy, GoogleStrategy } = require("./config");
const cookieParser = require("cookie-parser");

const app = express();

// set up view engine
app.set("view engine", "ejs");

// Connect to MongoDB
connectDB;

// Middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// passport.use(JwtStrategy);
// passport.use(GoogleStrategy);

require("./config/");

// Routes
app.use(Routes);

app.listen(3000, (req, res) => {
  console.log("Listening to port 3000");
});
