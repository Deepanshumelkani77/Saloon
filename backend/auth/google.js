// googleUserStrategy.js
require('dotenv').config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  "google-user",   // unique name
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_USER_CLIENT_ID,
      clientSecret: process.env.GOOGLE_USER_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_USER_CALLBACK_URL,
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