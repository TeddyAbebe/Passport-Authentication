const passport = require("passport");
const User = require("../../../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const email = profile.emails ? profile.emails[0].value : null;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
          existingUser.google = {
            id: profile.id,
            email: email,
            name: profile.displayName,
          };

          await existingUser.save();
          return cb(null, existingUser);
        } else {
          const newUser = new User({
            name: profile.displayName,
            email: email,
            google: {
              id: profile.id,
              email: email,
              name: profile.displayName,
            },
          });

          await newUser.save();
          return cb(null, newUser);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

module.exports = GoogleStrategy;
