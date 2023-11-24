require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  console.log("Extracted Token:", token);
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    // console.log("JWT Payload:", jwt_payload);
    try {
      const user = await User.findById(jwt_payload.id).exec();

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.error(err);
      return done(err, false);
    }
  })
);

module.exports = passport;
