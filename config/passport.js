const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/redirect",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(accessToken, profile);
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        if (!err) return cb(err, user);
        if (!user) {
          let newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
          });

          newUser.save();
          return cb(null, newUser);
        } else {
          return cb(null, user);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
