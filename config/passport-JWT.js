const passport = require("passport");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    (req) => {
      const token = req.cookies.token;
      return token;
    },
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      console.log("Payload:", payload);
      const user = await User.findById(payload.sub);

      if (!user) {
        console.log("User not found");
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.error("Error in JwtStrategy:", err);
      return done(err, false);
    }
  })
);

module.exports = { JwtStrategy, ExtractJwt };
