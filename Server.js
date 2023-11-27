require("dotenv").config();
const express = require("express");
const Routes = require("./routes");
const connectDB = require("./config/db");

const app = express();

require("./config/express")(app);
require("./routes")(app);
require("./config/passport");

function listen() {
  app.listen(3000, (req, res) => {
    console.log("Listening to port 3000");
  });
}

// Connect to MongoDB
connectDB().then(listen);
