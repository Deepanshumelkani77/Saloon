// googleUserStrategy.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  "google-user",   // unique name
  new GoogleStrategy(
    {
     clientID: "425613609140-eqbaqdekvfg1gaefqbmsff3001l1uj4v.apps.googleusercontent.com",
       clientSecret: "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",
      callbackURL: "http://localhost:1000/auth/google/user/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
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



// clientID: "425613609140-eqbaqdekvfg1gaefqbmsff3001l1uj4v.apps.googleusercontent.com",
//       clientSecret: "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",