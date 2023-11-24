require("dotenv").config();
const express = require("express");
const Routes = require("./routes");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const flash = require("connect-flash");
const { LocalStrategy, GoogleStrategy } = require("./config");

const app = express();

// set up view engine
app.set("view engine", "ejs");

app.use(flash());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

passport.use(LocalStrategy);
passport.use(GoogleStrategy);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(Routes);

app.listen(3000, (req, res) => {
  console.log("Listening to port 3000");
});
