const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../../../models/User");
const { compare } = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || !(await compare(password, user.password))) {
          return done(null, false, { message: "Incorrect Email or Password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = LocalStrategy;
