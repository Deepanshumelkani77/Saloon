const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User"); // your user model

passport.use(
  new GoogleStrategy(
    {
      clientID: "425613609140-eqbaqdekvfg1gaefqbmsff3001l1uj4v.apps.googleusercontent.com",
      clientSecret: "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",
callbackURL: "http://localhost:1000/auth/google/callback"


    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            username: profile.displayName, // Add username field
            email: profile.emails[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
