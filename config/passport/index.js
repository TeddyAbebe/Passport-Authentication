const passport = require("passport");
const LocalStrategy = require("./strategies/local");
const GoogleStrategy = require("./strategies/google");
const JwtStrategy = require("./strategies/jwt");
const User = require("../../models/User");

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

module.exports = { LocalStrategy, GoogleStrategy, JwtStrategy };
