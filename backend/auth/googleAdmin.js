const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Admin = require("../models/Admin");


passport.use(
  new GoogleStrategy(
    {
      clientID: "425613609140-eqbaqdekvfg1gaefqbmsff3001l1uj4v.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:1000/auth/google/callback",
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
