require("dotenv").config();
const express = require("express");
const Routes = require("./routes");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const { JwtStrategy, GoogleStrategy } = require("./config");

const app = express();

// set up view engine
app.set("view engine", "ejs");

app.use(flash());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
connectDB;

passport.use(JwtStrategy);
passport.use(GoogleStrategy);

app.use(passport.initialize());

// Routes
app.use(Routes);

app.listen(3000, (req, res) => {
  console.log("Listening to port 3000");
});
