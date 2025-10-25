require('dotenv').config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Admin = require("../models/Admin");


passport.use(
  "google-admin",   // unique name
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ADMIN_CLIENT_ID,
      clientSecret: process.env.GOOGLE_ADMIN_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_ADMIN_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let admin = await Admin.findOne({ email: profile.emails[0].value });
        if (!admin) {
          admin = new Admin({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });
          await admin.save();
        }
        return done(null, admin);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});
passport.deserializeUser(async (id, done) => {
  const admin = await Admin.findById(id);
  done(null, admin);
});
